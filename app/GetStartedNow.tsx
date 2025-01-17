import React from "react";
import Image from "next/image";

import Avatar from "@/public/images/avatars/avatar.webp"
import Avatar1 from "@/public/images/avatars/avatar-1.webp"
import Avatar3 from "@/public/images/avatars/avatar-3.webp"
import Avatar4 from "@/public/images/avatars/avatar-4.webp"
import Link from "next/link";

export default async function GetStartedNow() {

    return (



        <div className="relative py-16">
          <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container max-w-7xl mx-auto px-6 md:px-12 xl:px-6 mt-20">
            <div className="relative">
              <div className="flex items-center justify-center -space-x-2">
                <Image
                    loading="lazy"
                    width="400"
                    height="400"
                    src={Avatar}
                    alt="member photo"
                    className="h-8 w-8 rounded-full object-cover"
                />
                <Image
                    loading="lazy"
                    width="200"
                    height="200"
                    src={Avatar1}
                    alt="member photo"
                    className="h-12 w-12 rounded-full object-cover"
                />
                <Image
                    loading="lazy"
                    width="200"
                    height="200"
                    src={Avatar3}
                    alt="member photo"
                    className="z-10 h-16 w-16 rounded-full object-cover"
                />
                <Image
                    loading="lazy"
                    width="200"
                    height="200"
                    src={Avatar4}
                    alt="member photo"
                    className="relative h-12 w-12 rounded-full object-cover"
                />
                <Image
                    loading="lazy"
                    width="200"
                    height="200"
                    src={Avatar4}
                    alt="member photo"
                    className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
                <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">أبدأ رحلتك الأن !</h1>
                <p className="text-center text-xl text-gray-600 dark:text-gray-300">
                  انضم الى العديد من المؤسسات التعليمية حول العالم من مستخدمي سهيل
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link
                      prefetch={false}
                      href="/auth/login"
                      className="relative flex h-11 w-full text-white items-center justify-center px-6  rounded-full   bg-primary  transition duration-300 hover:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  >ابدأ الأن</Link>
                  <Link
                      href="#"
                      className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                  >
              <span
                  className="relative text-base font-semibold text-primary dark:text-white"
              >
                أعرف المزيد

              </span
              >
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>



    );
}
