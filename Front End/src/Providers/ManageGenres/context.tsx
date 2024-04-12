import { createContext } from 'react';

export interface IGenreResponse {
    result: {
        items: [
            {
                id: string;
                creationTime: string;
                creatorUserId: number;
                lastModificationTime: string;
                lastModifierUserId: number;
                genreName: string;
            }
        ]
        totalCount: number
    }
}

export interface IGenreCreate {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    genreName?: string
}

export interface IDeleteGenre {
    id: string;
}

export interface IFindGenresOfBook {
    id: string;
}

export interface IGenreStateContext {
    allGenres?: IGenreResponse;
    isInProgress?: any;
    error?: any;
    genreInput?: IGenreCreate;
    genreDeleteInput?: IDeleteGenre;
}

export interface IGenreActionContext {
    getAllGenres: () => Promise<IGenreResponse>;
    createGenre: (createGenre: IGenreCreate) => Promise<IGenreCreate>;
    deleteGenre: (deleteGenre: IDeleteGenre) => Promise<IDeleteGenre>;
    getGenresOfBook: (getGenresOfBook: IFindGenresOfBook) => Promise<IGenreResponse>
}

export const GENRE_CONTEXT_INITIAL_STATE: IGenreStateContext = {};

export const GenreStateContext = createContext<IGenreStateContext>(GENRE_CONTEXT_INITIAL_STATE);
export const GenreActionContext = createContext<IGenreActionContext>({} as any);