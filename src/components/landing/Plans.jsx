import React from "react";

export default function Plans() {
  return (
    <section id="plans" className="py-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-6 py-3 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-primary font-medium text-sm">الخطط والأسعار</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl font-bold mb-6 flex flex-col items-center justify-center gap-4">
            <span className="flex items-end justify-center gap-4">
              <span className="text-gray-800 font-bold">اختر</span>
              <div className="flex flex-col items-center text-primary relative">
                {/* SVG decoration in top left */}
                <svg
                  className="absolute -top-4 -left-6 w-8 h-7"
                  width="40"
                  height="34"
                  viewBox="0 0 51 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.8212 21.6974C24.5925 21.506 24.3978 21.363 24.228 21.1953C22.5079 19.507 21.2761 17.5742 20.2323 15.5562C20.1109 15.3194 20.0231 15.0561 20.015 14.8085C20.0102 14.6749 20.1566 14.4873 20.3063 14.4137C20.42 14.3592 20.6791 14.41 20.7888 14.4909C21.0002 14.6423 21.1914 14.8334 21.3354 15.038C22.289 16.3856 23.2338 17.7351 24.1666 19.0909C24.5139 19.5988 24.846 20.1177 25.1813 20.632C25.296 20.8029 25.3987 20.9801 25.487 21.1562C25.5911 21.3529 25.5843 21.568 25.3546 21.6695C25.2025 21.7356 25.0663 21.8223 24.8212 21.6974Z"
                    fill="#333333"
                  />
                  <path
                    d="M37.6756 19.4055C37.4764 19.6037 37.2627 19.8445 37.0219 20.059C36.0685 20.9033 35.1152 21.7475 34.1539 22.5815C33.9445 22.7621 33.6937 22.9153 33.4391 23.0416C33.1004 23.2124 32.8109 23.1835 32.5892 23.0144C32.3676 22.8452 32.3275 22.6 32.5249 22.3072C32.6578 22.1064 32.8115 21.8975 32.9993 21.7371C34.2444 20.6919 35.5007 19.6523 36.7593 18.6201C36.9005 18.5047 37.0783 18.4017 37.2638 18.3526C37.7235 18.2247 38.0944 18.5261 37.9619 18.9207C37.9075 19.0741 37.7845 19.2174 37.6756 19.4055Z"
                    fill="#333333"
                  />
                  <path
                    d="M13.6923 24.7312C13.4434 24.5794 13.2138 24.4 12.9962 24.2142C12.8033 24.0472 12.7319 23.836 12.8546 23.6175C12.9602 23.434 13.304 23.3531 13.6018 23.4674C14.0007 23.6208 14.402 23.7816 14.7656 23.9855C15.8617 24.6003 16.9505 25.2363 18.0306 25.8741C18.3877 26.0873 18.7319 26.3189 19.0696 26.5597C19.1848 26.6434 19.2928 26.7483 19.3512 26.8593C19.5225 27.1651 19.2941 27.4484 18.9072 27.4074C18.6895 27.3838 18.4585 27.3036 18.2691 27.2071C17.6292 26.9122 14.575 25.2622 13.6923 24.7312Z"
                    fill="#333333"
                  />
                </svg>
                <span className="font-bold underline decoration-secondary decoration-6 underline-offset-5 relative">
                  الخطة
                </span>
              </div>
            </span>
            {/* New line for the rest of the title */}
            <span className="text-gray-800 font-bold mt-2">المناسبة لك</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            خطط مرنة ومناسبة لجميع الاحتياجات مع ضمان أفضل قيمة مقابل المال.
          </p>
        </div>

        {/* الباقة العادية */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-700">الباقة العادية</h3>
        <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
          {/* جماعي */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-green-200 shadow-md p-8 max-w-md mx-auto md:mx-0 transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-100 text-green-600 text-xs font-bold px-4 py-1 rounded-full">جماعي</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">اشتراك شهري جماعي</h4>
            <div className="text-3xl font-bold text-green-600 mb-4">$49 <span className="text-base font-medium text-gray-500">/ شهر</span></div>
            <ul className="text-gray-600 space-y-2 mb-6 text-right">
              <li>دروس محدودة</li>
              <li>جلسات جماعية أساسية</li>
              <li>اختبارات أساسية</li>
              <li>خطة التعليم البسيط</li>
              <li>كل الأعمار</li>
            </ul>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition-all">اشترك الآن</button>
          </div>
          {/* فردي */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-blue-200 shadow-md p-8 max-w-md mx-auto md:mx-0 transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-4 py-1 rounded-full">فردي</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">اشتراك شهري فردي</h4>
            <div className="text-3xl font-bold text-blue-600 mb-4">$29 <span className="text-base font-medium text-gray-500">/ شهر</span></div>
            <ul className="text-gray-600 space-y-2 mb-6 text-right">
              <li>دروس محدودة</li>
              <li>جلسات مباشرة أساسية</li>
              <li>اختبارات أساسية</li>
              <li>خطة التعليم البسيط</li>
              <li>كل الأعمار</li>
            </ul>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-all">اشترك الآن</button>
          </div>
        </div>

        {/* الباقة الخاصة */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-700">الباقة الخاصة</h3>
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* سنوي */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-pink-200 shadow-md p-8 max-w-md mx-auto lg:mx-0 transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-pink-100 text-pink-600 text-xs font-bold px-4 py-1 rounded-full">سنوي</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">اشتراك سنوي</h4>
            <div className="text-3xl font-bold text-pink-600 mb-4">$199 <span className="text-base font-medium text-gray-500">/ سنة</span></div>
            <ul className="text-gray-600 space-y-2 mb-6 text-right">
              <li>دروس غير محدودة</li>
              <li>جلسات VIP عالية</li>
              <li>اختبارات عالية</li>
              <li>خطة تعليم متقدمة</li>
              <li>مكافآت مخصصة</li>
            </ul>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full transition-all">اشترك الآن</button>
          </div>
          {/* 6 أشهر */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-pink-200 shadow-md p-8 max-w-md mx-auto lg:mx-0 transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-pink-100 text-pink-600 text-xs font-bold px-4 py-1 rounded-full">6 أشهر</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">اشتراك ستة أشهر</h4>
            <div className="text-3xl font-bold text-pink-600 mb-4">$119 <span className="text-base font-medium text-gray-500">/ 6 أشهر</span></div>
            <ul className="text-gray-600 space-y-2 mb-6 text-right">
              <li>دروس غير محدودة</li>
              <li>جلسات VIP عالية</li>
              <li>اختبارات عالية</li>
              <li>خطة تعليم متقدمة</li>
              <li>مكافآت مخصصة</li>
            </ul>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full transition-all">اشترك الآن</button>
          </div>
          {/* 3 أشهر */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-pink-200 shadow-md p-8 max-w-md mx-auto lg:mx-0 transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-pink-100 text-pink-600 text-xs font-bold px-4 py-1 rounded-full">3 أشهر</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">اشتراك ثلاثة أشهر</h4>
            <div className="text-3xl font-bold text-pink-600 mb-4">$68 <span className="text-base font-medium text-gray-500">/ 3 أشهر</span></div>
            <ul className="text-gray-600 space-y-2 mb-6 text-right">
              <li>دروس غير محدودة</li>
              <li>جلسات VIP عالية</li>
              <li>اختبارات عالية</li>
              <li>خطة تعليم متقدمة</li>
              <li>مكافآت مخصصة</li>
            </ul>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full transition-all">اشترك الآن</button>
          </div>
        </div>
      </div>
    </section>
  );
} 