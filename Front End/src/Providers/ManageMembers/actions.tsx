import { createAction } from "redux-actions";
import { IMemberCreate, IMemberDelete, IMemberResponse, IMemberStateContext } from "./context";


export enum MemberActions {
    GET_ALL_MEMBERS = "GET_ALL_MEMBERS",
    CREATE_MEMBER = "CREATE_MEMBER",
    DELETE_MEMBER = "DELETE_MEMBER",
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