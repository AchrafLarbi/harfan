import React from "react";
import { Button } from "./UIComponents";

const getPlanTypeLabel = (planType) => {
  const labels = {
    monthly_individual: "شهرية فردية",
    monthly_group: "شهرية جماعية",
    quarterly: "ثلاثة أشهر",
    semi_annual: "ستة أشهر",
    annual: "سنوية",
  };
  return labels[planType] || planType;
};

const FeaturesList = ({ features, maxVisible = 3 }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700 mb-3">المميزات:</h4>
      <div className="flex flex-wrap gap-2">
        {features.slice(0, maxVisible).map((feature, index) => (
          <span
            key={index}
            className="text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-lg text-sm font-medium shadow-sm"
          >
            ✓ {feature}
          </span>
        ))}
        {features.length > maxVisible && (
          <span className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-lg bg-gray-50">
            +{features.length - maxVisible} مميزات أخرى
          </span>
        )}
      </div>
    </div>
  );
};

const StylePreview = ({ plan }) => (
  <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
    <h4 className="font-semibold text-gray-700 mb-3">معاينة التصميم:</h4>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">لون السعر:</span>
        <div
          className={`w-4 h-4 rounded-full bg-${plan.price_color}-500`}
        ></div>
        <span className={`text-${plan.price_color}-600 font-semibold`}>
          نموذج
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">لون الأيقونات:</span>
        <div className={`w-4 h-4 rounded-full bg-${plan.icon_color}-500`}></div>
        <span className={`text-${plan.icon_color}-600`}>✓</span>
      </div>
    </div>
  </div>
);

const PlanInfo = ({ plan }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">السعر:</span>
        <span className={`text-${plan.price_color}-600 font-bold`}>
          {plan.currency}
          {plan.price} {plan.duration_text}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">النوع:</span>
        <span className="text-gray-800 font-semibold">
          {getPlanTypeLabel(plan.plan_type)}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">الفئة:</span>
        <span className="text-gray-700">
          {plan.plan_category === "regular" ? "عادية" : "خاصة"}
        </span>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">ترتيب العرض:</span>
        <span className="text-gray-700">{plan.order}</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">نص الزر:</span>
        <span className="text-gray-700">{plan.button_text}</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">لون الخلفية:</span>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 border border-gray-300 rounded"
            style={{ backgroundColor: plan.background_color }}
          ></div>
          <span className="text-xs text-gray-500">{plan.background_color}</span>
        </div>
      </div>
    </div>
  </div>
);

export const PlanCard = ({ plan, onEdit, onDelete, loading }) => {
  const handleDelete = () => {
    if (window.confirm("هل أنت متأكد من حذف هذه الخطة؟")) {
      onDelete(plan.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Plan Header */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {plan.name_arabic}
            </h3>
            {plan.badge_text && (
              <span className="bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                {plan.badge_text}
              </span>
            )}
            {!plan.is_active && (
              <span className="bg-red-100 border border-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
                غير نشطة
              </span>
            )}
          </div>

          <PlanInfo plan={plan} />
          <FeaturesList features={plan.features} />
          <StylePreview plan={plan} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 ml-6 shrink-0">
          <Button
            size="sm"
            onClick={() => onEdit(plan)}
            disabled={loading}
            className="hover:scale-110 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[80px]"
          >
            ✏️ تعديل
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="hover:scale-110 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[80px]"
          >
            🗑️ حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
