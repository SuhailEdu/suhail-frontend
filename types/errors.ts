export const GENERIC_VALIDATION_ERROR_KEY : string = "VE_GENERIC_VALIDATION"
export const QUESTIONS_VALIDATION_ERROR_KEY : string = "VE_QUESTIONS_VALIDATION"


export interface ValidationError {
    validation_code: "VE_GENERIC_VALIDATION" | "VE_QUESTIONS_VALIDATION",
    validation_errors: any,
}

export interface QuestionsValidationError<T> {
    validation_code: "VE_QUESTIONS_VALIDATION",
    validation_errors: T,
}

export interface GenericValidationError<T> {
    validation_code: "VE_GENERIC_VALIDATION",
    validation_errors: T,
}
