"use server";

import {defaultSession, SessionData, sessionOptions} from "@/session";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import axiosClient from "@/providers/axiosClient";
import {isAxiosError} from "axios";
import {GenericValidationError, ValidationError} from "@/types/errors";


interface LoginValidationError {
    email: string[],
    password: string[],
}
interface RegisterValidationError {
    first_name: string[],
    last_name: string[],
    email: string[],
    password: string[],
}


export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);


    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    // CHECK THE USER IN THE DB

    return session;
};
type loginData = {
    email :string,
    password :string,
}

type registerData = {
    first_name :string,
    last_name :string,
    email :string,
    password :string,
}


export const register = async (
    formData:registerData
):Promise<{
    isOk:boolean,
    validation_errors?:RegisterValidationError,
    validation_code?: string,
    session?: string
} | undefined> => {
    const session = await getSession();

    try {
        const res = await axiosClient.post('/auth/register' , {...formData})
        session.isLoggedIn = true;
        session.id = res.data.id
        session.email = res.data.email
        session.firstName = res.data.first_name
        session.lastName = res.data.last_name
        session.token = res.data.token

        await session.save();

        return {
            isOk:true,
            session: JSON.stringify(session)
        }
    }
    catch (e:any) {
        if (!isAxiosError<ValidationError>(e)|| !e.response) {
            return
        }

        return {
            ...e.response.data as GenericValidationError<RegisterValidationError>,
            isOk: false
        };
    }

};

export const login = async (
    formData:loginData
): Promise<{
    isOk:boolean,
    validation_errors?:LoginValidationError,
    validation_code?: string,
    session?: string
} | undefined> => {

    const session = await getSession();

    try {
        const res = await axiosClient.post<{id:string,email:string,first_name:string , last_name:string , token:string}>
        ('/auth/login' , {...formData})
        session.isLoggedIn = true;
        session.id = res.data.id
        session.email = res.data.email
        session.firstName = res.data.first_name
        session.lastName = res.data.last_name
        session.token = res.data.token


        console.log("new token:")
        console.log(res.data.token)

        await session.save();
        return {
            isOk:true,
            session: JSON.stringify(session)
        }

    }
    catch (e:any) {
        if (!isAxiosError<ValidationError>(e)|| !e.response) {
            return
        }

        return {
            ...e.response.data as GenericValidationError<LoginValidationError>,
            isOk: false
        };

    }
};

export const logout = async () => {
    const session = await getSession();
         axiosClient.post('/home/logout' , {} , {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        } );
        session.destroy();


};

