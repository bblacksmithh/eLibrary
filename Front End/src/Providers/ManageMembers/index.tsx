"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { memberReducer } from "./reducer";
import { MEMBER_CONTEXT_INITIAL_STATE, MemberActionContext, MemberStateContext, IMemberResponse, IMemberCreate, IMemberDelete } from "./context";
import { createMemberAction, deleteMemberAction } from "./actions";

const MemberProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(memberReducer, MEMBER_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const getAllMembers = (): Promise<IMemberResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.get('https://localhost:44311/api/services/app/Member/GetAllMember')
                    .then((response) => {
                        dispatch(response as any);
                        setErrorLogin('');
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        setErrorLogin(e.message);
                        reject(e.message)
                    });
            }
        });
    
        const createMember = (userInput: IMemberCreate): Promise<IMemberCreate> =>
            new Promise((resolve, reject) => {
                dispatch(createMemberAction(userInput));
                console.log('userinput', userInput)
                setIsInProgress(true);
                axios.post('https://localhost:44311/api/services/app/Member/CreateMember', userInput)
                    .then((response) => {
                        console.log('resp',response);
                        
                        setErrorCreate('');
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        console.log(e.message);
                        setErrorCreate(e.message);
                        reject(e.message);
                    })
            })
            const deleteMember = (userInput: IMemberDelete): Promise<IMemberDelete> =>
                new Promise((resolve, reject) => {
                    dispatch(deleteMemberAction(userInput));
                    console.log('userinput', userInput)
                    setIsInProgress(true);
                    axios.delete(`https://localhost:44311/api/services/app/Member/Delete?id=${userInput.id}`)
                        .then((response) => {
                            console.log('resp', response);
        
                            setErrorCreate('');
                            setIsInProgress(false);
                            resolve(response.data);
                        })
                        .catch(e => {
                            console.log(e.message);
                            setErrorCreate(e.message);
                            reject(e.message);
                        })
                })

    return (
        <MemberStateContext.Provider
            value={{
                ...state,
                isInProgress:  isInProgress ,
                error:  errorLogin ,
            }}
        >
            <MemberActionContext.Provider
                value={{ 
                    getAllMembers,
                    createMember,
                    deleteMember
                 }}
            >
                {children}
            </MemberActionContext.Provider>
        </MemberStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(MemberStateContext);

    if (context == undefined) {
        throw new Error('useMemberState must be used within an MemberProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(MemberActionContext);

    if (context == undefined) {
        throw new Error('UseGenreActions must be used within a GenreProvider');
    }
    return context;
}

const useMember = () => {
    return {...useStateContext(), ...useActionsContext()};
};

export {useMember, MemberProvider};