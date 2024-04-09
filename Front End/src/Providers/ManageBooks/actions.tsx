import { createAction } from "redux-actions";
import { IBookCreate, IBookResponse, IBookStateContext } from "./context";


export enum BookActions {
    GET_ALL_BOOKS = "GET_ALL_BOOKS",
    CREATE_BOOK = "CREATE_BOOK"
}

export const getAllBooksAction = createAction<IBookStateContext, IBookResponse>(
    BookActions.GET_ALL_BOOKS,
    (allBooks)=>({allBooks})
);

export const createBookAction = createAction<IBookStateContext, IBookCreate>(
    BookActions.CREATE_BOOK,
    (bookInput) => ({bookInput})
)