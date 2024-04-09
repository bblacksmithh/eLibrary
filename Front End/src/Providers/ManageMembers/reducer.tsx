import { MemberActions } from "./actions";
import { IMemberStateContext } from "./context";

export function memberReducer(state: IMemberStateContext, action: ReduxActions.Action<IMemberStateContext>) {
    const {type, payload} = action;

    switch (type) {
        case MemberActions.GET_ALL_MEMBERS:
            return {
                ...state,
                ...payload,
            };
        case MemberActions.CREATE_MEMBER:
            return {
                ...state,
                ...payload,
            }
        case MemberActions.DELETE_MEMBER:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}