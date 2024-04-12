import { createAction } from "redux-actions";
import { IAllTransactionResponse, IDeleteTransaction, ITransactionCreate, ITransactionStateContext } from "./context";


export enum TransactionActions {
    GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
}

export const getAllTransactionsAction = createAction<ITransactionStateContext, IAllTransactionResponse>(
    TransactionActions.GET_ALL_TRANSACTIONS,
    (allTransactions)=>({allTransactions})
);

export const deleteTransactionAction = createAction<ITransactionStateContext, IDeleteTransaction>(
    TransactionActions.DELETE_TRANSACTION,
    (deleteTransactionInput) => ({deleteTransactionInput})
)

export const createTransactionAction = createAction<ITransactionStateContext, ITransactionCreate>(
    TransactionActions.CREATE_TRANSACTION,
    (createTransactionInput) => ({createTransactionInput})
)