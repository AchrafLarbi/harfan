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

const FeaturesList = ({ features, iconColor, maxVisible = 3 }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-medium text-gray-800 mb-2">المميزات:</h4>
      <div className="flex flex-wrap gap-2">
        {features.slice(0, maxVisible).map((feature, index) => (
          <span
            key={index}
            className={`text-${iconColor} bg-green-50 px-2 py-1 rounded text-xs`}
          >
            ✓ {feature}
          </span>
        ))}
        {features.length > maxVisible && (
          <span className="text-gray-500 text-xs px-2 py-1">
            +{features.length - maxVisible} مميزات أخرى
          </span>
        )}
      </div>
    </div>
  );
};

const StylePreview = ({ plan }) => (
  <div className="mt-4 p-3 border border-gray-200 rounded bg-white">
    <h4 className="font-medium text-gray-800 mb-2">معاينة التصميم:</h4>
    <div className="flex gap-4 text-xs">
      <div>
        <span className="font-medium">لون السعر:</span>
        <span className={`text-${plan.price_color} ml-1`}>نموذج</span>
      </div>
      <div>
        <span className="font-medium">لون الأيقونات:</span>
        <span className={`text-${plan.icon_color} ml-1`}>✓</span>
      </div>
      <div>
        <span className="font-medium">تدرج الزر:</span>
        <span
          className={`bg-gradient-to-r from-${plan.button_gradient_from} to-${plan.button_gradient_to} text-white px-2 py-1 rounded ml-1 text-xs`}
        >
          {plan.button_text}
        </span>
      </div>
    </div>
  </div>
);

const PlanInfo = ({ plan }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
    <div>
      <span className="font-medium">السعر:</span>
      <span className={`text-${plan.price_color} font-bold ml-1`}>
        {plan.currency}
        {plan.price} {plan.duration_text}
      </span>
    </div>
    <div>
      <span className="font-medium">النوع:</span>
      <span className="ml-1">{getPlanTypeLabel(plan.plan_type)}</span>
    </div>
    <div>
      <span className="font-medium">الفئة:</span>
      <span className="ml-1">
        {plan.plan_category === "regular" ? "عادية" : "خاصة"}
      </span>
    </div>
    <div>
      <span className="font-medium">ترتيب العرض:</span>
      <span className="ml-1">{plan.order}</span>
    </div>
    <div>
      <span className="font-medium">نص الزر:</span>
      <span className="ml-1">{plan.button_text}</span>
    </div>
    <div>
      <span className="font-medium">لون الخلفية:</span>
      <div className="inline-flex items-center gap-1 ml-1">
        <div
          className="w-4 h-4 border border-gray-300 rounded"
          style={{ backgroundColor: plan.background_color }}
        ></div>
        <span className="text-xs">{plan.background_color}</span>
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
    <div
      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: plan.background_color || "#ffffff",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* Plan Header */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {plan.name_arabic}
            </h3>
            {plan.badge_text && (
              <span
                className={`text-${plan.price_color} bg-blue-100 px-3 py-1 rounded-full text-sm font-medium`}
              >
                {plan.badge_text}
              </span>
            )}
            {!plan.is_active && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                غير نشطة
              </span>
            )}
          </div>

          <PlanInfo plan={plan} />
          <FeaturesList features={plan.features} iconColor={plan.icon_color} />
          <StylePreview plan={plan} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4">
          <Button size="sm" onClick={() => onEdit(plan)} disabled={loading}>
            تعديل
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
