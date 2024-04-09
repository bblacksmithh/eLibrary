import { createAction } from "redux-actions";
import { IDeleteGenre, IGenreCreate, IGenreResponse, IGenreStateContext } from "./context";


export enum GenreActions {
    GET_ALL_GENRES = "GET_ALL_GENRES",
    CREATE_GENRE = "CREATE_GENRE",
    DELETE_GENRE = "DELETE_GENRE",
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