"use client"

import { LibrarianAuthActions, librarianLoginAction } from "./action";
import { ILibrarianStateContext } from "./context";

export function librarianAuthReducer(state: ILibrarianStateContext, action: ReduxActions.Action<ILibrarianStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case LibrarianAuthActions.LIBRARIAN_LOGIN:
            return {
                ...state,
                ...payload,
            };
        case LibrarianAuthActions.LIBRARIAN_CREATE:
            return {
                ...state,
                ...payload,
            };
        case LibrarianAuthActions.GET_ALL_LIBRARIANS:
            return {
                ...state,
                ...payload,
            };
        case LibrarianAuthActions.DELETE_LIBRARIAN:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}