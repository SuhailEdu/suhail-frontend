export interface Exam  {
  id: string,
  user_id: string,
  exam_title: string,
  status: 'public' | 'private',
  created_at: string,
  updated_at: string,
  questions_count: number,
  participants_count: number,
    ip_range_start: string,
    ip_range_end: string,
    live_status: '' | 'live' | 'paused' | 'finished',
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
export interface Question  {
    title:string,
    type:string,
    options:Option[],
}


export interface Option  {
    option: string,
    isCorrect: boolean,
}
