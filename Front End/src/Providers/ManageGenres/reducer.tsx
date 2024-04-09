import { GenreActions } from "./actions";
import { IGenreStateContext } from "./context";

export function genreReducer(state: IGenreStateContext, action: ReduxActions.Action<IGenreStateContext>) {
    const {type, payload} = action;

    switch (type) {
        case GenreActions.GET_ALL_GENRES:
            return {
                ...state,
                ...payload,
            };
        case GenreActions.CREATE_GENRE:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}