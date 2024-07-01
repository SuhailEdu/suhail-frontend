import { SessionOptions } from "iron-session";

export interface SessionData {
    id?:string;
    email?:string;
    isLoggedIn:boolean,
    firstName? :string,
    lastName? :string,
    token? :string,
}

export const defaultSession:SessionData = {
    isLoggedIn:false
}

export const sessionOptions: SessionOptions ={
    password: '12345123451234512345123451234512345',
    cookieName: "lama-session",
    cookieOptions:{
        httpOnly:false,
        secure: false
    }
}