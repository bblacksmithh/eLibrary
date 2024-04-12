"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { memberReducer } from "./reducer";
import { TRANSACTION_CONTEXT_INITIAL_STATE, TransactionActionContext, TransactionStateContext, IAllTransactionResponse, IDeleteTransaction, ITransactionCreate } from "./context";
import { createTransactionAction, deleteTransactionAction, getAllTransactionsAction } from "./actions";

const TransactionProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(memberReducer, TRANSACTION_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const getAllTransactions = (): Promise<IAllTransactionResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.get('https://localhost:44311/api/services/app/Transaction/GetAllTransaction')
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
        const deleteTransaction = (userInput: IDeleteTransaction): Promise<IDeleteTransaction> =>
            new Promise((resolve, reject) => {
                dispatch(deleteTransactionAction(userInput));
                console.log('userinput', userInput)
                setIsInProgress(true);
                axios.delete(`https://localhost:44311/api/services/app/Transaction/Delete?id=${userInput.id}`)
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

            const createTransaction = (userInput: ITransactionCreate): Promise<ITransactionCreate> =>
                new Promise((resolve, reject) => {
                    dispatch(createTransactionAction(userInput));
                    console.log('userinput', userInput)
                    setIsInProgress(true);
                    axios.post('https://localhost:44311/api/services/app/Book/CreateTransaction', userInput)
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
        <TransactionStateContext.Provider
            value={{
                ...state,
                isInProgress:  isInProgress ,
                error:  errorLogin ,
            }}
        >
            <TransactionActionContext.Provider
                value={{ 
                    getAllTransactions,
                    deleteTransaction,
                    createTransaction
                 }}
            >
                {children}
            </TransactionActionContext.Provider>
        </TransactionStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(TransactionStateContext);

    if (context == undefined) {
        throw new Error('useMemberState must be used within an MemberProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(TransactionActionContext);

    if (context == undefined) {
        throw new Error('UseGenreActions must be used within a GenreProvider');
    }
    return context;
}

const useTransaction = () => {
    return {...useStateContext(), ...useActionsContext()};
};

export {useTransaction, TransactionProvider};