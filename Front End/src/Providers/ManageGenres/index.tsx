"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { genreReducer } from "./reducer";
import { GENRE_CONTEXT_INITIAL_STATE, GenreActionContext, GenreStateContext, IDeleteGenre, IFindGenresOfBook, IGenreCreate, IGenreResponse } from "./context";
import { createGenreAction, deleteGenreAction, getAllGenresAction } from "./actions";

const GenreProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(genreReducer, GENRE_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const getAllGenres = (): Promise<IGenreResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.get('https://localhost:44311/api/services/app/Genre/GetAll')
                    .then((response) => {
                        dispatch(response as any);
                        setErrorLogin('');
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        setErrorLogin(e.message);
                        reject(e.message)
                    });
            }
        });
    const createGenre = (userInput: IGenreCreate): Promise<IGenreCreate> =>
        new Promise((resolve, reject) => {
            dispatch(createGenreAction(userInput));
            console.log('userinput', userInput)
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/Genre/Create', userInput)
                .then((response) => {
                    console.log('resp', response);

                    setErrorCreate('');
                    setIsInProgress(false);
                    resolve(response.data);
                })
                .catch(e => {
                    console.log(e.message);
                    setErrorCreate(e.message);
                    reject(e.message);
                })
        })
    const deleteGenre = (userInput: IDeleteGenre): Promise<IDeleteGenre> =>
        new Promise((resolve, reject) => {
            dispatch(deleteGenreAction(userInput));
            console.log('userinput', userInput)
            setIsInProgress(true);
            axios.delete(`https://localhost:44311/api/services/app/Genre/DeleteGenre?id=${userInput.id}`)
                .then((response) => {
                    console.log('resp', response);

                    setErrorCreate('');
                    setIsInProgress(false);
                    resolve(response.data);
                })
                .catch(e => {
                    console.log(e.message);
                    setErrorCreate(e.message);
                    reject(e.message);
                })
        })
        const getGenresOfBook = (input: IFindGenresOfBook): Promise<IGenreResponse> =>
            new Promise((resolve, reject) => {
                {
                    setIsInProgress(true);
                    axios.get(`https://localhost:44311/api/services/app/GenreOnBook/GetGenresOfBook?id=${input.id}`)
                        .then((response) => {
                            dispatch(response as any);
                            setErrorLogin('');
                            setIsInProgress(false);
                            resolve(response.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            setErrorLogin(e.message);
                            reject(e.message)
                        });
                }
            });

    return (
        <GenreStateContext.Provider
            value={{
                ...state,
                isInProgress: isInProgress,
                error: errorLogin,
            }}
        >
            <GenreActionContext.Provider
                value={{
                    getAllGenres,
                    createGenre,
                    deleteGenre,
                    getGenresOfBook
                }}
            >
                {children}
            </GenreActionContext.Provider>
        </GenreStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(GenreStateContext);

    if (context == undefined) {
        throw new Error('useGenreState must be used within an GenreProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(GenreActionContext);

    if (context == undefined) {
        throw new Error('UseGenreActions must be used within a GenreProvider');
    }
    return context;
}

const useGenre = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useGenre, GenreProvider };