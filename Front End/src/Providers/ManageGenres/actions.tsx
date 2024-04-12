import { createAction } from "redux-actions";
import { IDeleteGenre, IFindGenresOfBook, IGenreCreate, IGenreResponse, IGenreStateContext } from "./context";


export enum GenreActions {
    GET_ALL_GENRES = "GET_ALL_GENRES",
    CREATE_GENRE = "CREATE_GENRE",
    DELETE_GENRE = "DELETE_GENRE",
    GET_GENRES_OF_BOOK = "GET_GENRES_OF_BOOK",

}

export const getAllGenresAction = createAction<IGenreStateContext, IGenreResponse>(
    GenreActions.GET_ALL_GENRES,
    (allGenres)=>({allGenres})
);

export const createGenreAction = createAction<IGenreStateContext, IGenreCreate>(
    GenreActions.CREATE_GENRE,
    (genreInput) => ({genreInput})
);

export const deleteGenreAction = createAction<IGenreStateContext, IDeleteGenre>(
    GenreActions.DELETE_GENRE,
    (genreDeleteInput) => ({genreDeleteInput})
)

export const getGenresByBookAction = createAction<IGenreStateContext, IGenreResponse>(
    GenreActions.GET_GENRES_OF_BOOK,
    (allGenres) => ({allGenres})
)