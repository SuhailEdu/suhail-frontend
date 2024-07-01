import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export interface Exam  {
  id: string,
  user_id: string,
  exam_title: string,
  status: string,
  created_at: string,
  updated_at: string,
  questions_count: number,
  participants_count: number,
  // questions: {
  //   title:string,
  //   type:string,
  //   options:{
  //     option: string,
  //     isCorrect: boolean,
  //
  //   }[],
  //
  // }[],


}
