import { createAction } from "redux-actions";
import { IAddCredits, IMemberCreate, IMemberDelete, IMemberResponse, IMemberStateContext } from "./context";


export enum MemberActions {
    GET_ALL_MEMBERS = "GET_ALL_MEMBERS",
    CREATE_MEMBER = "CREATE_MEMBER",
    DELETE_MEMBER = "DELETE_MEMBER",
    ADD_CREDITS = "ADD_CREDITS",
}

export const getAllMembersAction = createAction<IMemberStateContext, IMemberResponse>(
    MemberActions.GET_ALL_MEMBERS,
    (allMembers)=>({allMembers})
);

export const createMemberAction = createAction<IMemberStateContext, IMemberCreate>(
    MemberActions.CREATE_MEMBER,
    (memberInput) => ({memberInput})
)

export const deleteMemberAction = createAction<IMemberStateContext, IMemberDelete>(
    MemberActions.DELETE_MEMBER,
    (memberDeleteInput) => ({memberDeleteInput})
)

export const addCreditsAction = createAction<IMemberStateContext, IAddCredits>(
    MemberActions.ADD_CREDITS,
    (addCreditsInput) => ({addCreditsInput})
)