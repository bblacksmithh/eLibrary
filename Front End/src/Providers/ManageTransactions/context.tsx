import { createContext } from 'react';

export interface ITransactionResponse {
    id: string;
    librarianName: string;
    memberUsername: string;
    bookNames: string[];
    borrowDate: Date;
    returnDate: Date;
    cost: number;
}

export interface ITransactionCreate {
    id: string;
    cost: number;
    userId: number;
    memberId: string;
    returnDate: Date;
    bookIds: string[]
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
    createTransactionInput?: ITransactionCreate;
}

export interface ITransactionActionContext {
    getAllTransactions: () => Promise<IAllTransactionResponse>
    deleteTransaction: (deleteTransaction: IDeleteTransaction) => Promise<IDeleteTransaction>
    createTransaction: (createTransaction: ITransactionCreate) => Promise<ITransactionCreate>
}

export const TRANSACTION_CONTEXT_INITIAL_STATE: ITransactionStateContext = {};

export const TransactionStateContext = createContext<ITransactionStateContext>(TRANSACTION_CONTEXT_INITIAL_STATE);
export const TransactionActionContext = createContext<ITransactionActionContext>({} as any);