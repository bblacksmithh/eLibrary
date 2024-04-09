"use client"

import { createContext } from "react";

export interface ILibrarianAuthLogin {
    userNameOrEmailAddress: string,
    password: string
}

export interface ILibrarianCreate {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    nationalId?: string;
    employeeNumber?: string;
    username?: string;
    password?: string;
    registerDate?: string;
}

export interface ILibrarianAuthResponse {
    result: {
        accessToken: string;
        encryptedAccessToken: string;
        expireInSeconds: number;
        userId: number;
    };
    targetUrl: null | string;
    success: boolean;
    error: null | string;
    unAuthorizedRequest: boolean;
    __abp: boolean;

}

export interface ILibrarianResponse {
    id: string;
    creationTime: string;
    creatorUserId: number;
    lastModificationTime: string;
    lastModifierUserId: number;
    firstName: string;
    lastName: string;
    email: string;
    nationalId: string;
    employeeNumber: string;
    username: string;
    password: string;
    registerDate: string;
}

export interface IAllLibrarianResponse {
    result: ILibrarianResponse[];
}

export interface IDeleteLibrarian {
    id: string
}

export interface ILibrarianStateContext {
    auth?: ILibrarianAuthLogin;
    isInProgress?: any;
    error?: any;
    librarianInput?: ILibrarianCreate;
    allLibrarians?: IAllLibrarianResponse;
    deletedLibrarian?: IDeleteLibrarian;
}

export interface ILibrarianActionContext {
    login: (auth: ILibrarianAuthLogin) => Promise<ILibrarianAuthResponse>
    create: (create: ILibrarianCreate) => Promise<ILibrarianCreate>
    getAllLibrarians: () => Promise<IAllLibrarianResponse>
    deleteLibrarian: (deleteLibrarian: IDeleteLibrarian) => Promise<IDeleteLibrarian>
}

export const LIBRARIAN_AUTH_CONTEXT_INITIAL_STATE: ILibrarianStateContext = {};

export const LibrarianAuthStateContext = createContext<ILibrarianStateContext>(LIBRARIAN_AUTH_CONTEXT_INITIAL_STATE);

export const LibrarianAuthActionContext = createContext<ILibrarianActionContext>({} as any);
