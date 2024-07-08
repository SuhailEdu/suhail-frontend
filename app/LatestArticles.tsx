import React from "react";
import Image from "next/image";
import ArticleCover1 from "@/public/images/article-cover1.avif"
import ArticleCover2 from "@/public/images/article-cover2.avif"
import ArticleCover3 from "@/public/images/article-cover3.avif"

export default async function LatestArticles() {

    return (




        <div id="blog">
          <div className="container max-w-7xl mx-auto px-6 md:px-12 xl:px-6 my-20 ">
            <div className="mb-12 space-y-2 text-center">
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">أخر المقالات</h2>
              <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
                نكتب لك مقالات يوميا لتحقق أفضل النتائج في المنصة
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                <div className="relative overflow-hidden rounded-xl">
                  <Image src={ArticleCover1}
                       alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
                </div>
                <div className="mt-6 relative">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    ما هي الأسئلة المناسبة للاختبارات الالكترونية؟
                  </h3>
                  <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                    تمتاز الاختبارات الالكترونية عن تلك الاعتيادية بأنها...
                  </p>
                  <a className="inline-block" href="#">
                    <span className="text-info dark:text-blue-300">أقرأ المزيد</span>
                  </a>
                </div>

              </div>
              <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                <div className="relative overflow-hidden rounded-xl">
                  <Image src={ArticleCover3}
                       alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
                </div>
                <div className="mt-6 relative">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    ما هي الأسئلة المناسبة للاختبارات الالكترونية؟
                  </h3>
                  <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                    تمتاز الاختبارات الالكترونية عن تلك الاعتيادية بأنها...
                  </p>
                  <a className="inline-block" href="#">
                    <span className="text-info dark:text-blue-300">أقرأ المزيد</span>
                  </a>
                </div>

              </div>
              <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                <div className="relative overflow-hidden rounded-xl">
                  <Image src={ArticleCover2}
                       alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
                </div>
                <div className="mt-6 relative">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    ما هي الأسئلة المناسبة للاختبارات الالكترونية؟
                  </h3>
                  <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                    تمتاز الاختبارات الالكترونية عن تلك الاعتيادية بأنها...
                  </p>
                  <a className="inline-block" href="#">
                    <span className="text-info dark:text-blue-300">أقرأ المزيد</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>




    );
}
