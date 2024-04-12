import { createContext } from 'react';

export interface IMemberResponse {
    result: [
            {
                id: string;
                creationTime: string;
                creatorUserId: number;
                lastModificationTime: string;
                lastModifierUserId: number;
                firstName: string;
                lastName: string;
                email: string;
                nationalId: string;
                username: string;
                password: string;
                registerDate: string;
                credits: number;
            } 
        ]
        
}

export interface IMemberCreate {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    nationalId?: string;
    username?: string;
    password?: string;
    registerDate?: string;
    credits?: number;
}

export interface IMemberDelete {
    id: string;
}

export interface IMemberStateContext {
    allMembers?: IMemberResponse;
    isInProgress?: any;
    error?: any;
    memberInput?: IMemberCreate;
    memberDeleteInput?: IMemberDelete;
}

export interface IMemberActionContext {
    getAllMembers: () => Promise<IMemberResponse>
    createMember: (createMember: IMemberCreate) => Promise<IMemberCreate>
    deleteMember: (deleteMember: IMemberDelete) => Promise<IMemberDelete>
}

export const MEMBER_CONTEXT_INITIAL_STATE: IMemberStateContext = {};

export const MemberStateContext = createContext<IMemberStateContext>(MEMBER_CONTEXT_INITIAL_STATE);
export const MemberActionContext = createContext<IMemberActionContext>({} as any);