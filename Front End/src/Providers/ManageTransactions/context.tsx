import { createContext } from 'react';

export interface ITransactionResponse {
    id: string;
    creationTime: string;
    creatorUserId: number;
    lastModificationTime: string;
    lastModifierUserId: number;
    cost: number;
    librarianId: string;
    memberId: string;
    returnDate: string;
    bookIds: string[];
}

export interface IAllTransactionResponse {
    result: ITransactionResponse[]
}

export interface IDeleteTransaction {
    id?: number;
}

export interface ITransactionStateContext {
    allTransactions?: IAllTransactionResponse;
    isInProgress?: any;
    error?: any;
    deleteTransactionInput?: IDeleteTransaction;
}

export interface ITransactionActionContext {
    getAllTransactions: () => Promise<IAllTransactionResponse>
    deleteTransaction: (deleteTransaction: IDeleteTransaction) => Promise<IDeleteTransaction>
}

export const TRANSACTION_CONTEXT_INITIAL_STATE: ITransactionStateContext = {};

export const TransactionStateContext = createContext<ITransactionStateContext>(TRANSACTION_CONTEXT_INITIAL_STATE);
export const TransactionActionContext = createContext<ITransactionActionContext>({} as any);