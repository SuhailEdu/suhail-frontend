import Image from "next/image";

import Step1 from '@/public/images/step1.png'
import Step2 from '@/public/images/step2.png'
import Step3 from '@/public/images/step3.png'
import Step4 from '@/public/images/step4.png'

export default async function Features() {

    return (

        <div id="features ">
  <div className="container max-w-7xl mb-20 mx-auto px-6 md:px-12 xl:px-6">
    <div className="md:w-2/3 lg:w-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
      </svg>

      <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">أختبارك الألكتروني في دقائق</h2>
      <p className="text-gray-600 dark:text-gray-300">مع سهل، يمكنك إضافة اختبارات جديدة بسهولة ويسر، دون الحاجة إلى مساعدة تقنية، مما يوفر لك الوقت والجهد ويزيد من كفاءة عملية التقييم</p>
    </div>
    <div
      className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
    >
      <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
              src={Step1}
            className="w-12"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary"
            >
              أولا : أضف أسئلتك الخاصة
            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              قم بإنشاء أسئلة اختبار متنوعة، ببساطة وسرعة.            </p>
          </div>
          <a href="#" className="flex items-center justify-between group-hover:text-primary">
            <span className="text-sm">أقرأ المزيد</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
              src={Step2}
            className="w-12"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary"
            >
              ثانيا : أظبط أعدادات الأختبار            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              حدد وقت الاختبار والإعدادات الأخرى التي تتناسب مع متطلباتك التعليمية.            </p>
          </div>
          <a href="#" className="flex items-center justify-between group-hover:text-primary">
            <span className="text-sm">أقرأ المزيد</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
              src={Step3}
            className="w-12"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary"
            >
             ثالثا:  أدعو طلابك للاختبار            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              يمكن للطلاب الوصول إلى الاختبار باستخدام حساباتهم والإجابة على الأسئلة بكل يسر            </p>
          </div>
          <a href="#" className="flex items-center justify-between group-hover:text-primary">
            <span className="text-sm">أقرأ المزيد</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div
        className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
      >
        <div
          className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800"
        >
          <Image
            src={Step4}
            className="w-12"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary"
            >
              أخيرا: احصل على نتائج الاختبار
            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              نوفر لك امكانية حساب درجات الاختبار تلقائيا
              </p>
          </div>
          <a href="#" className="flex items-center justify-between group-hover:text-primary">
            <span className="text-sm">أقرأ المزيد</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}
