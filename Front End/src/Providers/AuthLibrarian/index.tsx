"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import { librarianAuthReducer } from "./reducer";
import { IAllLibrarianResponse, ILibrarianAuthLogin, ILibrarianAuthResponse, ILibrarianCreate, LIBRARIAN_AUTH_CONTEXT_INITIAL_STATE, LibrarianAuthActionContext, LibrarianAuthStateContext } from "./context";
import { librarianLoginAction, librarianCreateAction } from "./action";
import axios from "axios";

const LibrarianAuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(librarianAuthReducer, LIBRARIAN_AUTH_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const login = (userInput: ILibrarianAuthLogin): Promise<ILibrarianAuthResponse> =>
        new Promise((resolve, reject) => {
            {
                dispatch(librarianLoginAction(userInput));
                setIsInProgress(true);
                axios.post('https://localhost:44311/api/TokenAuth/Authenticate', userInput)
                    .then((response) => {
                        
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

    const create = (userInput: ILibrarianCreate): Promise<ILibrarianCreate> =>
        new Promise((resolve, reject) => {
            dispatch(librarianCreateAction(userInput));
            console.log('userinput', userInput)
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/Librarian/CreateLibrarian', userInput)
                .then((response) => {
                    console.log('resp',response);
                    
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
        const getAllLibrarians = (): Promise<IAllLibrarianResponse> =>
            new Promise((resolve, reject) => {
                {
                    setIsInProgress(true);
                    axios.get('https://localhost:44311/api/services/app/Librarian/GetAllLibrarian')
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
        <LibrarianAuthStateContext.Provider
            value={{
                ...state,
                isInProgress:  isInProgress ,
                error:  errorLogin ,
            }}
        >
            <LibrarianAuthActionContext.Provider
                value={{ 
                    login,
                    create,
                    getAllLibrarians
                 }}
            >
                {children}
            </LibrarianAuthActionContext.Provider>
        </LibrarianAuthStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(LibrarianAuthStateContext);

    if (context == undefined) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(LibrarianAuthActionContext);

    if (context == undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

const useLibrarian = () => {
    return {...useStateContext(), ...useActionsContext()};
};

export {useLibrarian, LibrarianAuthProvider};