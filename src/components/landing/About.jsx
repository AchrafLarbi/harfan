import kidImage from "../../assets/landing/kid.png";
import background from "../../assets/landing/background.png";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right side - Content */}
          <div className="order-2 lg:order-1">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 bg-[#3D4D9C33] rounded-full px-4 py-2 mb-8">
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
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span className="text-primary font-medium text-sm">من نحن ؟</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              منصة تعليمية
              <br />
              <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">
                إسلامية متطورة
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              حرفان منصة تعليمية تفاعلية تجمع بين تعلم اللغة العربية وحفظ القرآن
              الكريم بأسلوب مبسط شيق ومتدرج بحيث تركز على التعليم بالتكنولوجيا
              والأنشطة التفاعلية أين يجد المتعلم نفسه في قضاء بيئة تعليمية عليا
              القيم الأصدق ويزيد من ثقته واحترامه مقارنة بالطرق التقليدية أي أنه
              لا يكتفي بشاهدته المحتوى وقراءته فقط بل يشارك فيه.
            </p>

            {/* Statistics section */}
          </div>

          {/* Left side - Image */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* Container with same positioning for background and kid image */}
            <div className="relative min-w-[500px] min-h-[500px] ">
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
              <div className="absolute -top-4 right-3/4 bg-white rounded-2xl px-6 py-6 shadow-2xl z-20 ">
                <span className="text-[#524FD5] font-bold text-md">
                  +10 دروس
                </span>
                <p className="text-gray-500 font-normal text-xs">
                  تعليمية كل يوم
                </p>
              </div>

              {/* Kid image - positioned to not be cropped */}

              {/* Bottom profile section */}
              <div className="absolute -bottom-4 left-3/4 transform -translate-x-1/2 bg-white rounded-2xl px-6 py-6 shadow-lg z-20">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-orange-400 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center">
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
