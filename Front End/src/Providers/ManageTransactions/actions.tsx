import { createAction } from "redux-actions";
import { IAllTransactionResponse, ITransactionStateContext } from "./context";


export enum TransactionActions {
    GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS",
}

export const getAllTransactionsAction = createAction<ITransactionStateContext, IAllTransactionResponse>(
    TransactionActions.GET_ALL_TRANSACTIONS,
    (allTransactions)=>({allTransactions})
);