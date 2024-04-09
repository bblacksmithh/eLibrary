import { createContext } from 'react';

export interface IBookResponse {
    result: {
        items: [
            {
                id: string;
                creationTime: string;
                creatorUserId: number;
                lastModificationTime: string;
                lastModifierUserId: number;
                title: string;
                author: string;
                isbn: string;
                condition: string;
                genreIds: string[];
            }
        ]
        totalCount: number
    }
}

export interface IBookCreate {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    title?: string;
    author?: string;
    isbn?: string;
    condition?: string;
    genreIds?: string[];
}

export interface IDeleteBook{
    id?: string;
}

export interface IBookStateContext {
    allBooks?: IBookResponse;
    isInProgress?: any;
    error?: any;
    bookInput?: IBookCreate;
    deleteBookInput?: IDeleteBook;
}


export interface IBookActionContext {
    getAllBooks: () => Promise<IBookResponse>
    createBook: (bookInput: IBookCreate) => Promise<IBookCreate>
    deleteBook: (deleteBook: IDeleteBook) => Promise<IDeleteBook>
}

export const BOOK_CONTEXT_INITIAL_STATE: IBookStateContext = {};

export const BookStateContext = createContext<IBookStateContext>(BOOK_CONTEXT_INITIAL_STATE);
export const BookActionContext = createContext<IBookActionContext>({} as any);