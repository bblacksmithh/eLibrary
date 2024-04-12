import { TransactionActions } from "./actions";
import { ITransactionStateContext } from "./context";

export function memberReducer(state: ITransactionStateContext, action: ReduxActions.Action<ITransactionStateContext>) {
    const {type, payload} = action;

    switch (type) {
        case TransactionActions.GET_ALL_TRANSACTIONS:
            return {
                ...state,
                ...payload,
            };
        case TransactionActions.DELETE_TRANSACTION:
            return {
                ...state,
                ...payload,
            }
        case TransactionActions.CREATE_TRANSACTION:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}