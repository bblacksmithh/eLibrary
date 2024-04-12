import { createContext } from 'react';

export interface IBookResponse {
    result: [
        {
            book: {
                id: string;
                creationTime: string;
                creatorUserId: number;
                lastModificationTime: string;
                lastModifierUserId: number;
                title: string;
                author: string;
                description: string;
                isbn: string;
                condition: string;
                rating?: number;
                genreIds?: string[];
            },
            genreNames?: string[]
        }
    ]
}

export interface IBook {
    id: string;
    creationTime: string;
    creatorUserId: number;
    lastModificationTime: string;
    lastModifierUserId: number;
    title: string;
    author: string;
    description: string;
    isbn: string;
    condition: string;
    rating?: number;
    genreIds: string[];
}

export interface ITopTwelveResponse {
    result: IBook[]
}

export interface ITrendingResponse {
    result: IBook[]
}

export interface ISearchResponse {
    result: IBook[]
}

export interface IBookCreate {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    title?: string;
    author?: string;
    description?: string;
    isbn?: string;
    condition?: string;
    rating?: number;
    genreIds?: string[];
}

export interface IDeleteBook {
    id?: string;
}

export interface IBookStateContext {
    allBooks?: IBookResponse;
    isInProgress?: any;
    error?: any;
    bookInput?: IBookCreate;
    deleteBookInput?: IDeleteBook;
    topTwelve?: ITopTwelveResponse;
    trending?: ITrendingResponse;
    searchTitle?: ISearchResponse;
}


export interface IBookActionContext {
    getAllBooks: () => Promise<IBookResponse>
    createBook: (bookInput: IBookCreate) => Promise<IBookCreate>
    deleteBook: (deleteBook: IDeleteBook) => Promise<IDeleteBook>
    getTopTwelve: () => Promise<ITopTwelveResponse>
    getTrending: () => Promise<ITrendingResponse>
    searchBookByTitle: (searchInput: string) => Promise<ISearchResponse>
}

export const BOOK_CONTEXT_INITIAL_STATE: IBookStateContext = {};

export const BookStateContext = createContext<IBookStateContext>(BOOK_CONTEXT_INITIAL_STATE);
export const BookActionContext = createContext<IBookActionContext>({} as any);