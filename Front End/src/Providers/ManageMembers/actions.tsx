import { createAction } from "redux-actions";
import { IMemberCreate, IMemberResponse, IMemberStateContext } from "./context";


export enum MemberActions {
    GET_ALL_MEMBERS = "GET_ALL_MEMBERS",
    CREATE_MEMBER = "CREATE_MEMBER",
}

export const getAllMembersAction = createAction<IMemberStateContext, IMemberResponse>(
    MemberActions.GET_ALL_MEMBERS,
    (allMembers)=>({allMembers})
);

export const createMemberAction = createAction<IMemberStateContext, IMemberCreate>(
    MemberActions.CREATE_MEMBER,
    (memberInput) => ({memberInput})
)