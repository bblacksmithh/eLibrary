import { createAction } from "redux-actions";
import { IAllTransactionResponse, IDeleteTransaction, ITransactionStateContext } from "./context";


export enum TransactionActions {
    GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
}

export const getAllTransactionsAction = createAction<ITransactionStateContext, IAllTransactionResponse>(
    TransactionActions.GET_ALL_TRANSACTIONS,
    (allTransactions)=>({allTransactions})
);

export const deleteTransactionAction = createAction<ITransactionStateContext, IDeleteTransaction>(
    TransactionActions.DELETE_TRANSACTION,
    (deleteTransactionInput) => ({deleteTransactionInput})
)