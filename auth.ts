"use server";

import {defaultSession, SessionData, sessionOptions} from "@/session";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import axiosClient from "@/providers/axiosClient";
import {isAxiosError} from "axios";
import {GenericValidationError} from "@/types/errors";


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
) => {
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
    }
    catch (e:any) {
        if (!isAxiosError<GenericValidationError<LoginValidationError>>(e)|| !e.response) {
            return
        }

        console.log('errors here')
        console.log(e.response.data.validation_code)
        return {
            ...e.response.data,
            isOk: false
        };
    }

    redirect("/");
};

export const login = async (
    formData:loginData
): Promise<{
    isOk:boolean,
    validation_errors:LoginValidationError,
    validation_code: string
} | undefined> => {

    const session = await getSession();

    try {
        const res = await axiosClient.post('/auth/login' , {...formData})
        session.isLoggedIn = true;
        console.log(res.data)
        session.id = res.data.id
        session.email = res.data.email
        session.firstName = res.data.first_name
        session.lastName = res.data.last_name
        session.token = res.data.token
        console.log('no errors' , res.data)

        await session.save();
    }
    catch (e:any) {
        if (!isAxiosError<GenericValidationError<LoginValidationError>>(e)|| !e.response) {
            return
        }

        console.log('errors here')
        console.log(e.response.data.validation_code)
        return {
            ...e.response.data,
            isOk: false
        };

    }

    redirect("/");


    // session.userId = "1";
    // session.username = formUsername;
    // session.isPro = isPro;
};

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
};

