"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { memberReducer } from "./reducer";
import { TRANSACTION_CONTEXT_INITIAL_STATE, TransactionActionContext, TransactionStateContext, IAllTransactionResponse } from "./context";
import { getAllTransactionsAction } from "./actions";

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