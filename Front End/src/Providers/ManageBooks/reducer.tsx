"use client"

import { BookActions } from "./actions";
import { IBookStateContext } from "./context";

export function bookReducer(state: IBookStateContext, action: ReduxActions.Action<IBookStateContext>) {
    const {type, payload} = action;

    switch (type) {
        case BookActions.GET_ALL_BOOKS:
            return {
                ...state,
                ...payload,
            };
        case BookActions.CREATE_BOOK:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}