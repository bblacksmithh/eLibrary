"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { bookReducer } from "./reducer";
import { BOOK_CONTEXT_INITIAL_STATE, BookActionContext, BookStateContext, IBookCreate, IBookResponse, IDeleteBook, ISearchResponse, ITopTwelveResponse, ITrendingResponse } from "./context";
import { createBookAction, deleteBookAction, getAllBooksAction } from "./actions";

const BookProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, BOOK_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const getAllBooks = (): Promise<IBookResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.get('https://localhost:44311/api/services/app/Book/GetAllBooks')
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
    const createBook = (userInput: IBookCreate): Promise<IBookCreate> =>
        new Promise((resolve, reject) => {
            dispatch(createBookAction(userInput));
            console.log('userinput', userInput)
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/Book/Create', userInput)
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

    const deleteBook = (userInput: IDeleteBook): Promise<IDeleteBook> =>
        new Promise((resolve, reject) => {
            dispatch(deleteBookAction(userInput));
            console.log('userinput', userInput)
            setIsInProgress(true);
            axios.delete(`https://localhost:44311/api/services/app/Book/DeleteBook?id=${userInput.id}`)
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

        const getTopTwelve = (): Promise<ITopTwelveResponse> =>
            new Promise((resolve, reject) => {
                {
                    setIsInProgress(true);
                    axios.get('https://localhost:44311/api/services/app/Book/GetTopTwelveBooks')
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
            const getTrending = (): Promise<ITrendingResponse> =>
                new Promise((resolve, reject) => {
                    {
                        setIsInProgress(true);
                        axios.get('https://localhost:44311/api/services/app/Book/GetTrendingBooks')
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
            const searchBookByTitle = (searchInput: string): Promise<ISearchResponse> => 
                new Promise((resolve, reject) => {
                    setIsInProgress(true);
                    axios.get(`https://localhost:44311/api/services/app/Book/SearchBooks?searchTerm=${searchInput}`)
                        .then((response) => {
                            dispatch(response as any);
                            setIsInProgress(false);
                            resolve(response.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            reject(e.message);
                        })
                })
    return (
        <BookStateContext.Provider
            value={{
                ...state,
                isInProgress: isInProgress,
                error: errorLogin,
            }}
        >
            <BookActionContext.Provider
                value={{
                    getAllBooks,
                    createBook,
                    deleteBook,
                    getTopTwelve,
                    getTrending,
                    searchBookByTitle
                }}
            >
                {children}
            </BookActionContext.Provider>
        </BookStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(BookStateContext);

    if (context == undefined) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(BookActionContext);

    if (context == undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

const useBook = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useBook, BookProvider };