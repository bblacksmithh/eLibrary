import { createAction } from "redux-actions";
import { IBookCreate, IBookResponse, IBookStateContext, IDeleteBook, ISearchResponse, ITopTwelveResponse, ITrendingResponse } from "./context";


export enum BookActions {
    GET_ALL_BOOKS = "GET_ALL_BOOKS",
    CREATE_BOOK = "CREATE_BOOK",
    DELETE_BOOK = "DELETE_BOOK",
    GET_TOP_TWELVE = "GET_TOP_TWELVE",
    GET_TRENDING = "GET_TRENDING",
    SEARCH_BY_TITLE = "SEARCH_BY_TITLE",
}

export const getAllBooksAction = createAction<IBookStateContext, IBookResponse>(
    BookActions.GET_ALL_BOOKS,
    (allBooks)=>({allBooks})
);

export const createBookAction = createAction<IBookStateContext, IBookCreate>(
    BookActions.CREATE_BOOK,
    (bookInput) => ({bookInput})
)

export const deleteBookAction = createAction<IBookStateContext, IDeleteBook>(
    BookActions.DELETE_BOOK,
    (deleteBookInput) => ({deleteBookInput})
)

export const getTopFiveAction = createAction<IBookStateContext, ITopTwelveResponse>(
    BookActions.GET_TOP_TWELVE,
    (topTwelve) => ({topTwelve})
)

export const getTrendingAction = createAction<IBookStateContext, ITrendingResponse>(
    BookActions.GET_TRENDING,
    (trending) => ({trending})
)

export const searchByTitleAction = createAction<IBookStateContext, ISearchResponse>(
    BookActions.SEARCH_BY_TITLE,
    (searchTitle) => ({searchTitle})
)