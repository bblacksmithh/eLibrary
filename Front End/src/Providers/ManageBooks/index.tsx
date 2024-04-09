"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { bookReducer } from "./reducer";
import { BOOK_CONTEXT_INITIAL_STATE, BookActionContext, BookStateContext, IBookCreate, IBookResponse } from "./context";
import { createBookAction, getAllBooksAction } from "./actions";

const BookProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, BOOK_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const getAllBooks = (): Promise<IBookResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.get('https://localhost:44311/api/services/app/Book/GetAll')
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
    return (
        <BookStateContext.Provider
            value={{
                ...state,
                isInProgress:  isInProgress ,
                error:  errorLogin ,
            }}
        >
            <BookActionContext.Provider
                value={{ 
                    getAllBooks,
                    createBook
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
    return {...useStateContext(), ...useActionsContext()};
};

export {useBook, BookProvider};