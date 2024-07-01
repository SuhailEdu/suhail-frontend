
// export type AuthActions = "set-logged-in-user" | "delete-logged-in-user"

import {create} from "zustand";
type AuthUser = {

    id?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    token?: string,
    isLoggedIn:boolean,

}
type AuthStoreState  = {
    user: AuthUser,
    setAuthUser: (user: AuthUser) => void,
}

const useAuthStore = create<AuthStoreState>()(set => ({
    user: {
        isLoggedIn: false,
    },
    setAuthUser: (user: AuthUser) => set((state) => ({user: user})),

}))

export default useAuthStore;
