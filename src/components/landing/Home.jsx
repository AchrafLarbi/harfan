export default function HeroSection() {
  // Statistics data in JSON format
  const statisticsData = [
    {
      id: 1,
      number: "500+",
      label: "طالب نشط",
    },
    {
      id: 2,
      number: "1000+",
      label: "درس تفاعلي",
    },
    {
      id: 3,
      number: "50+",
      label: "معلم متخصص",
    },
    {
      id: 4,
      number: "98%",
      label: "رضا العملاء",
    },
  ];

  return (
    <section
      id="home"
      className="py-10"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-6 p-10">
        <div className="text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-6 py-3 mb-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-bookmark-icon lucide-bookmark"
              className="text-primary"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <span className="text-primary font-medium text-sm">
              منصة تعليمية إسلامية متطورة
            </span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-6 flex items-end justify-center gap-4">
              <span className="text-[#374151] font-bold">منصة</span>
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
                  حرفان
                </span>
              </div>
            </h1>
            <h2 className="text-6xl text-[#374151] font-bold">
              لتعلم العربية و القرآن الكريم
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed ">
            تعليم مبسط وتفاعلي، أنشطة حية ومحفزة، تواصل مباشر مع المعلمين، وتطور
            مستمر
            <br />
            في بيئة إسلامية آمنة.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center items-center mb-20">
            <button className="bg-primary text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              ابدأ رحلتك التعليمية
            </button>
            <button className="border-2 border-primary text-primary font-medium px-6 py-3 rounded-full flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              تصفح الخطط و الاسعار
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            {statisticsData.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium text-xl">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
