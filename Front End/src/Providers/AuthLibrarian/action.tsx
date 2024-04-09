"use client"

import { createAction } from "redux-actions";
import { IAllLibrarianResponse, IDeleteLibrarian, ILibrarianAuthLogin, ILibrarianAuthResponse, ILibrarianCreate, ILibrarianStateContext } from "./context";

export enum LibrarianAuthActions {
    LIBRARIAN_LOGIN = "LIBRARIAN_LOGIN",
    LIBRARIAN_CREATE = 'LIBRARIAN_CREATE',
    GET_ALL_LIBRARIANS = 'GET_ALL_LIBRARIANS',
    DELETE_LIBRARIAN = "DELETE_LIBRARIAN"
}

export const librarianLoginAction = createAction<ILibrarianStateContext, ILibrarianAuthLogin>(
    LibrarianAuthActions.LIBRARIAN_LOGIN,
    (auth) => ({auth})
);

export const librarianCreateAction = createAction<ILibrarianStateContext, ILibrarianCreate>(
    LibrarianAuthActions.LIBRARIAN_CREATE,
    (librarianInput) => ({librarianInput})
)

export const getAllBooksAction = createAction<ILibrarianStateContext, IAllLibrarianResponse>(
    LibrarianAuthActions.GET_ALL_LIBRARIANS,
    (allLibrarians)=>({allLibrarians})
);

export const deleteLibrarianAction = createAction<ILibrarianStateContext, IDeleteLibrarian>(
    LibrarianAuthActions.DELETE_LIBRARIAN,
    (deletedLibrarian) => ({deletedLibrarian})
)