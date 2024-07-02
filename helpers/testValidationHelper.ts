import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {z} from "zod";

// export function validateTitle(): boolean {
//   const schema = z.string().min(6)
//       .refine(value => {
//         const titles = questions
//             .filter(q => q.id !== activeQuestion.id)
//             .map(q => q.title)
//
//         console.log(titles, value)
//
//         if (!titles) {
//           return true
//
//         }
//
//         return !titles.includes(value)
//
//
//       }, 'عنوان السؤال مكرر')
//   const validation = schema.safeParse(activeQuestion.title)
//
//   if (validation.success) {
//     return true
//   } else {
//     const message = JSON.parse(validation.error.message)[0].message
//     setTitleError(message)
//     return false
//
//   }
//
// }
