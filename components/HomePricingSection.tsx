import Link from "next/link";

export default function HomePricingSection() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">باقات مصممة لتناسب جميع الفئات</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">نعرض عليك أفضل الباقات لتناسب احتياجاتك التعليمية</p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div
                        className="flex flex-col  max-w-sm text-gray-900 rounded-2xl bg-indigo-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
                        <h3 className="font-manrope text-2xl font-bold mb-3">الأفراد</h3>
                        <div className="flex items-center mb-6">
                            <span className="font-manrope mr-2 text-6xl font-semibold">$0</span>
                            <span className="text-xl text-gray-500 ">/ شهريا</span>
                        </div>
                        <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>10 اختبارات يومية</span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>100 مشارك لكل اختبار</span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>24/7 دعم فني </span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>وصول لحزمة المطورين API</span>
                            </li>
                        </ul>
                        <Link href="/"
                           className="py-4 px-8 bg-indigo-600 shadow-sm rounded-full transition-all duration-500 text-lg text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700">اشترك</Link>
                    </div>

                    <div
                        className="flex flex-col  max-w-sm text-gray-900 rounded-2xl bg-indigo-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
                        <h3 className="font-manrope text-2xl font-bold mb-3">المنظمات</h3>
                        <div className="flex items-center mb-6">
                            <span className="font-manrope mr-2 text-6xl font-semibold">$100</span>
                            <span className="text-xl text-gray-500 ">/ شهريا</span>
                        </div>
                        <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>10 اختبارات يومية</span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>100 مشارك لكل اختبار</span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>24/7 دعم فني </span>
                            </li>
                            <li className="flex items-center gap-1 space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <span>وصول لحزمة المطورين API</span>
                            </li>
                        </ul>
                        <Link href="/"
                              className="py-4 px-8 bg-indigo-600 shadow-sm rounded-full transition-all duration-500 text-lg text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700">اشترك</Link>
                    </div>



                </div>
            </div>
        </section>
    )
}
