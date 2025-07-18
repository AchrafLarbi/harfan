import {
  BookmarkIcon,
  BookOpenIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function HeroSection() {
  // Real-time countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 55,
    hours: 20,
    minutes: 12,
    seconds: 39,
  });

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const statisticsData = [
    {
      id: 1,
      number: timeLeft.days.toString().padStart(2, "0"),
      label: "أيام",
    },
    {
      id: 2,
      number: timeLeft.hours.toString().padStart(2, "0"),
      label: "ساعات",
    },
    {
      id: 3,
      number: timeLeft.minutes.toString().padStart(2, "0"),
      label: "دقائق",
    },
    {
      id: 4,
      number: timeLeft.seconds.toString().padStart(2, "0"),
      label: "ثواني",
    },
  ];

  return (
    <section id="home" className="py-10" dir="rtl" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-6 p-10">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-6 py-3 mb-12"
            data-aos="fade-down"
          >
            <BookmarkIcon className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium text-sm">
              منصة تعليمية إسلامية متطورة
            </span>
          </div>

          <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-6xl font-bold mb-6 flex items-end justify-center gap-4">
              <span className="text-[#374151] font-bold">منصة</span>
              <div className="flex flex-col items-center text-primary relative">
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

          <p
            className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed "
            data-aos="fade-up"
            data-aos-delay="200"
          >
            تعليم مبسط وتفاعلي، أنشطة حية ومحفزة، تواصل مباشر مع المعلمين، وتطور
            مستمر
            <br />
            في بيئة إسلامية آمنة.
          </p>

          <div
            className="flex gap-4 justify-center items-center mb-20"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <button className="bg-primary text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              ابدأ رحلتك التعليمية
            </button>
            <button className="border-2 border-primary text-primary font-medium px-6 py-3 rounded-full flex items-center gap-2">
              <Bars3Icon className="w-5 h-5" />
              تصفح الخطط و الاسعار
            </button>
          </div>

          {/* Countdown Section */}
          <div className="mb-8">
            <p className="text-gray-600 mb-6 text-2xl">
              رحلتك نحو العلم تبدأ قريباً...
            </p>
            <div className="flex justify-center items-center gap-8 max-w-3xl mx-auto mb-4">
              {statisticsData.map((stat, i) => (
                <div
                  key={stat.id}
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay={400 + i * 100}
                >
                  {/* Flip Card Container */}
                  <div className="relative">
                    {/* Main Card */}
                    <div className="relative w-24 h-32">
                      {/* Card Background with Notches */}
                      <div
                        className="absolute inset-0 bg-primary shadow-xl"
                        style={{
                          borderRadius: "16px",
                        }}
                      ></div>

                      {/* Left Notch */}
                      <div className="absolute left-0 top-1/2 w-3 h-6 bg-primary transform -translate-y-1/2 -translate-x-1.5 rounded-3xl"></div>

                      {/* Right Notch */}
                      <div className="absolute right-0 top-1/2 w-3 h-6 bg-primary transform -translate-y-1/2 translate-x-1.5 rounded-3xl"></div>

                      {/* Content Container */}
                      <div className="relative w-full h-full text-white flex items-center justify-center">
                        {/* Top Half */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1/2 bg-primary border-b border-primary "
                          style={{
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                          }}
                        ></div>

                        {/* Bottom Half */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary"
                          style={{
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }}
                        ></div>

                        {/* Middle Line */}
                        <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-[#3A4FB7] transform -translate-y-1/2"></div>

                        {/* Number */}
                        <div className="relative z-10 text-4xl font-bold">
                          {stat.number}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="text-gray-600 font-medium text-base mt-4">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-2xl">
              نعدّ الثواني لانطلاق منصّتنا التعليمية!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
