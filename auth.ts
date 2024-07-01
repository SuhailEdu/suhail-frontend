"use server";

import { sessionOptions, SessionData, defaultSession } from "@/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosClient from "@/providers/axiosClient";
import {AxiosError} from "axios";
import useAuthStore from "@/stores/AuthStore";


export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);


    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    // CHECK THE USER IN THE DB

    return session;
};

type Data = {
    email :string,
    password :string,
}

export const login = async (
    formData:Data
) => {
    const session = await getSession();

    try {
        const res = await axiosClient.post('/auth/login' , {...formData})
        session.isLoggedIn = true;
        session.id = res.data.id
        session.email = res.data.email
        session.firstName = res.data.first_name
        session.lastName = res.data.last_name
        session.token = res.data.token
        console.log('no errors' , res.data)


        await session.save();
    }
    catch (e:any) {
        console.log('errors here')
        if (!e.isAxiosError) {
            return
        }

        if (e && e.response.status === 422) {

        return {
            status: e.response.status,
            errors: e.response.data,
            isOk: false
        }
        }
        return
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

