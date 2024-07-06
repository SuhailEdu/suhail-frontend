import {AxiosError} from "axios";

export interface ValidationError< T extends object> extends AxiosError {
    status: 422,
        error: {
            validation_code: "VE_QUESTIONS_VALIDATION" | "VE_GENERIC_VALIDATION",
            validation_errors: T
        }
}