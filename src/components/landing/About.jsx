import kidImage from "../../assets/landing/kid.png";
import background from "../../assets/landing/background.png";

export default function About() {
  return (
    <section id="about" className="py-20" dir="rtl">
      <div className="max-w-7xl mx-auto ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right side - Content - Shows first on mobile */}
          <div className="order-1 lg:order-1 pr-5">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-4 py-2 mb-8">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1223 10.25C14.2469 10.25 15.1171 12.3979 15.4684 13.946C15.6581 14.782 14.967 15.5 14.0917 15.5H13.1443M11.1002 6.5C12.6525 6.5 13.6554 5.26878 13.6554 3.75C13.6554 2.23122 12.6525 1 11.1002 1M9.53469 15.5H1.9339C1.35693 15.5 0.902945 15.0317 1.01791 14.4785C1.33533 12.9512 2.37199 10.25 5.73429 10.25C9.0966 10.25 10.1333 12.9512 10.4507 14.4785C10.5656 15.0317 10.1117 15.5 9.53469 15.5ZM8.545 3.75C8.545 5.26878 7.2866 6.5 5.73429 6.5C4.18198 6.5 2.92359 5.26878 2.92359 3.75C2.92359 2.23122 4.18198 1 5.73429 1C7.2866 1 8.545 2.23122 8.545 3.75Z"
                  stroke="#3D4D9C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-primary font-medium text-sm">من نحن ؟</span>
            </div>

            {/* Main heading */}
            <div className="mb-6">
              <h1 className="text-6xl  font-bold  sm:mb-6 flex items-end justify-start gap-2 sm:gap-4">
                <span className="text-gray-800 font-bold">منصة</span>
                <div className="flex flex-col items-start text-primary relative">
                  {/* SVG icon positioned above the text */}
                  <svg
                    width="30"
                    height="25"
                    viewBox="0 0 51 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-5 sm:w-8 sm:h-7 md:w-10 md:h-8 lg:w-10 lg:h-9 mt-1 mr-16 sm:mr-20 md:mr-24 lg:mr-36"
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

                  {/* Text with underline positioned below the SVG */}
                  <span className="font-bold underline decoration-secondary decoration-4 ">
                    تعليمية
                  </span>
                </div>
              </h1>
              <h2 className="text-6xl font-bold text-[#374151]">
                إسلامية متطورة{" "}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed mb-8">
              حرفان منصة تعليمية تفاعلية تجمع بين تعلم اللغة العربية وحفظ القرآن
              الكريم بأسلوب مبسط شيق ومتدرج بحيث تركز على التعليم بالتكنولوجيا
              والأنشطة التفاعلية أين يجد المتعلم نفسه في قضاء بيئة تعليمية عليا
              القيم الأصدق ويزيد من ثقته واحترامه مقارنة بالطرق التقليدية أي أنه
              لا يكتفي بشاهدته المحتوى وقراءته فقط بل يشارك فيه.
            </p>

            {/* Statistics section */}
          </div>

          {/* Left side - Image - Shows second on mobile */}
          <div className="order-2 lg:order-2 relative flex justify-center items-center">
            {/* Container with same positioning for background and kid image */}
            <div className="relative min-w-[280px] min-h-[320px] sm:min-w-[350px] sm:min-h-[400px] md:min-w-[420px] md:min-h-[450px] lg:min-w-[500px] lg:min-h-[500px]">
              {/* Background image */}
              <img
                src={background}
                alt="Background shape"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Kid image - positioned exactly like background */}
              <img
                src={kidImage}
                alt="طالب سعيد"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />

              {/* Top badge */}
              <div className="absolute -top-2 right-1/2 sm:-top-3 sm:right-2/3 md:-top-4 md:right-3/4 lg:-top-4 lg:right-3/4 bg-white rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6 shadow-lg sm:shadow-xl lg:shadow-2xl z-20">
                <span className="text-[#524FD5] font-bold text-xs sm:text-sm lg:text-md">
                  +10 دروس
                </span>
                <p className="text-gray-500 font-normal text-xs">
                  تعليمية كل يوم
                </p>
              </div>

              {/* Bottom profile section */}
              <div className="absolute -bottom-2 left-1/2 sm:-bottom-3 sm:left-2/3 md:-bottom-4 md:left-3/4 lg:-bottom-4 lg:left-3/4 transform -translate-x-1/2 bg-white rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6 shadow-lg z-20">
                <div className="flex flex-col items-start gap-2 sm:gap-3">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-orange-400 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-green-400 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-purple-400 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+10</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs flex m-auto font-normal">
                    طلاب جدد كل يوم
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
