import {AxiosError, isAxiosError} from "axios";

export interface ValidationError<E ,  T > extends AxiosError {
            c: {
                validation_code: T,
                // validation_code: "VE_QUESTIONS_VALIDATION" | "VE_GENERIC_VALIDATION",
                validation_errors: E,

        }
}

// export function isServerValidationError<T>(e:unknown): e is ValidationError<T> {
//
//     return isAxiosError<T>(e) && typeof e.response !== "undefined";
// }
//
export function isGenericValidationError<T>(e:unknown): e is ValidationError<T , "VE_GENERIC_VALIDATION_"> {

    return isAxiosError<T>(e) && typeof e.response !== "undefined";
}

export const GENERIC_VALIDATION_ERROR : string = "VE_GENERIC_VALIDATION"

export interface GenericValidationError<T> {
    validation_code: "VE_GENERIC_VALIDATION",
    validation_errors: T,

}