export default function Features() {
  const featuresData = [
    {
      id: 1,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0625 19.0625L10 16.5625L5.9375 19.0625M3.4375 15.3125H16.5625C17.9432 15.3125 19.0625 14.1932 19.0625 12.8125V3.4375C19.0625 2.05679 17.9432 0.9375 16.5625 0.9375H3.4375C2.05679 0.9375 0.9375 2.05679 0.9375 3.4375V12.8125C0.9375 14.1932 2.05679 15.3125 3.4375 15.3125Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "دروس مباشرة تفاعلية",
      description: "تعلم مع أساتذة متخصصين في جلسات مباشرة مع تفاعل حقيقي",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-400",
    },
    {
      id: 2,
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1875 15.9375L12.7297 17.093C13.1593 18.0087 14.4421 18.0615 14.9455 17.1841L17.8125 12.1875M15 24.0625C9.99492 24.0625 5.9375 20.0051 5.9375 15C5.9375 9.99492 9.99492 5.9375 15 5.9375C20.0051 5.9375 24.0625 9.99492 24.0625 15C24.0625 20.0051 20.0051 24.0625 15 24.0625Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "اختبارات ذكية متطورة",
      description: "قيم مستواك واختبر معلوماتك بتمارين تفاعلية متنوعة ومتقدمة",
      iconBg: "bg-gradient-to-br from-[#3C8AED] to-[#2AB2D5]",
    },
    {
      id: 3,
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 22.8125C19.375 22.8125 24.0625 20.625 24.0625 15C24.0625 9.375 19.375 7.1875 15 7.1875C10.625 7.1875 5.9375 9.375 5.9375 15C5.9375 16.2873 6.18299 17.3945 6.61403 18.3367C6.88272 18.924 7.03344 19.5716 6.91442 20.2064L6.58668 21.9544C6.42467 22.8184 7.18159 23.5753 8.04563 23.4133L12.0549 22.6616C12.37 22.6025 12.6931 22.6077 13.0098 22.6579C13.6688 22.7624 14.338 22.8125 15 22.8125Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.875 15C11.875 15.3452 11.5952 15.625 11.25 15.625C10.9048 15.625 10.625 15.3452 10.625 15C10.625 14.6548 10.9048 14.375 11.25 14.375C11.5952 14.375 11.875 14.6548 11.875 15Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.625 15C15.625 15.3452 15.3452 15.625 15 15.625C14.6548 15.625 14.375 15.3452 14.375 15C14.375 14.6548 14.6548 14.375 15 14.375C15.3452 14.375 15.625 14.6548 15.625 15Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.375 15C19.375 15.3452 19.0952 15.625 18.75 15.625C18.4048 15.625 18.125 15.3452 18.125 15C18.125 14.6548 18.4048 14.375 18.75 14.375C19.0952 14.375 19.375 14.6548 19.375 15Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "دردشة مع المعلمين",
      description: "تواصل مباشر مع المدرسين للحصول على الدعم الفوري",
      iconBg: "bg-gradient-to-br from-[#35C368] to-[#2BB2D6]",
    },

    {
      id: 4,
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8125 5.9375L16.8125 0.9375H1.1875L6.1875 5.9375M15.5625 12.5C15.5625 16.1244 12.6244 19.0625 9 19.0625C5.37563 19.0625 2.4375 16.1244 2.4375 12.5C2.4375 8.87563 5.37563 5.9375 9 5.9375C12.6244 5.9375 15.5625 8.87563 15.5625 12.5Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "ألعاب تعليمية ممتعة",
      description: " تعلم باللعب من خلال ألعاب تفاعلية محفزة ومسلية",
      iconBg: "bg-gradient-to-br from-[#F46B2E] to-[#EC4645]",
    },
  ];

  return (
    <section
      id="features"
      className="py-20"
      dir="rtl"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-4 py-2 mb-6" data-aos="fade-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium text-sm text-primary">
              مميزاتنا الفريدة
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl font-bold mb-6 flex items-end justify-center " data-aos="fade-up" data-aos-delay="100">
            <span className="text-[#374151] font-extra ml-4">ما الذي</span>
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
              <span className="font-extrabold text-6xl underline decoration-secondary decoration-6 underline-offset-5 relative">
                يميز
              </span>
            </div>
          </h1>
          <h2 className="text-6xl font-bold text-[#374151]" data-aos="fade-up" data-aos-delay="150">منصة حرفان </h2>

          {/* Description */}
          <p className="text-xl sm:text-2xl mt-5 text-gray-600 leading-relaxed max-w-4xl" data-aos="fade-up" data-aos-delay="200">
            مميزات فريدة وتقنيات متطورة تجعل تعلم العربية والقرآن الكريم أكثر
            متعة وفعالية.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, i) => (
            <div
              key={feature.id}
              className="bg-white rounded-3xl p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl group"
              data-aos="zoom-in"
              data-aos-delay={300 + i * 100}
            >
              {/* Icon */}
              <div
                className={`${feature.iconBg}  w-14 h-14 rounded-xl flex items-center justify-center  mb-8 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-start leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-start text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
