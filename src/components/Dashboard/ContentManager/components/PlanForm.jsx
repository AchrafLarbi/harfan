import React, { useState } from "react";
import { Input, Select, Button } from "./UIComponents";

const PLAN_TYPE_OPTIONS = [
  { value: "monthly_individual", label: "شهرية فردية" },
  { value: "monthly_group", label: "شهرية جماعية" },
  { value: "quarterly", label: "ثلاثة أشهر" },
  { value: "semi_annual", label: "ستة أشهر" },
  { value: "annual", label: "سنوية" },
];

const PLAN_CATEGORY_OPTIONS = [
  { value: "regular", label: "عادية" },
  { value: "special", label: "خاصة" },
];

const CURRENCY_OPTIONS = [
  { value: "ريال", label: "ريال" },
  { value: "$", label: "دولار" },
  { value: "€", label: "يورو" },
];

const FeaturesList = ({ features, onChange }) => {
  const addFeature = () => {
    onChange([...features, ""]);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    onChange(newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    onChange(newFeatures);
  };

  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-3 items-center">
          <input
            type="text"
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 hover:border-gray-400 shadow-sm"
            placeholder="أدخل ميزة الخطة"
          />
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeFeature(index)}
            className="shrink-0 hover:scale-105 transition-transform duration-200"
          >
            حذف
          </Button>
        </div>
      ))}
      <Button
        onClick={addFeature}
        variant="secondary"
        className="w-full hover:scale-[1.02] transition-all duration-200 hover:shadow-md border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
      >
        + إضافة ميزة جديدة
      </Button>
    </div>
  );
};

export const PlanForm = ({
  planData,
  onSave,
  onCancel,
  loading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(planData);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_arabic) {
      newErrors.name_arabic = "اسم الخطة مطلوب";
    }
    if (!formData.duration_text) {
      newErrors.duration_text = "نص المدة مطلوب";
    }
    if (!formData.plan_type) {
      newErrors.plan_type = "نوع الخطة مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-800 border-b pb-2">
          المعلومات الأساسية
        </h4>

        <Select
          label="نوع الخطة"
          value={formData.plan_type}
          onChange={(e) => handleChange("plan_type", e.target.value)}
          options={PLAN_TYPE_OPTIONS}
          required
          error={errors.plan_type}
        />

        <Select
          label="فئة الخطة"
          value={formData.plan_category}
          onChange={(e) => handleChange("plan_category", e.target.value)}
          options={PLAN_CATEGORY_OPTIONS}
        />

        <Input
          label="اسم الخطة بالعربية"
          value={formData.name_arabic}
          onChange={(e) => handleChange("name_arabic", e.target.value)}
          placeholder="مثال: الخطة الشهرية"
          required
          error={errors.name_arabic}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="السعر"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              handleChange("price", parseFloat(e.target.value) || 0)
            }
            placeholder="99.99"
            required
          />

          <Select
            label="العملة"
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            options={CURRENCY_OPTIONS}
          />
        </div>

        <Input
          label="نص المدة"
          value={formData.duration_text}
          onChange={(e) => handleChange("duration_text", e.target.value)}
          placeholder="مثال: شهريًا، سنويًا"
          required
          error={errors.duration_text}
        />

        <Input
          label="نص الشارة"
          value={formData.badge_text}
          onChange={(e) => handleChange("badge_text", e.target.value)}
          placeholder="مثال: جماعي، فردي"
        />

        <Input
          label="نص الزر"
          value={formData.button_text}
          onChange={(e) => handleChange("button_text", e.target.value)}
          placeholder="اشترك الآن"
        />
      </div>

      {/* Styling Options */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-800 border-b pb-2">
          خيارات التصميم
        </h4>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            لون الخلفية
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.background_color}
              onChange={(e) => handleChange("background_color", e.target.value)}
              className="w-12 h-12 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors duration-200 shadow-sm"
            />
            <input
              type="text"
              value={formData.background_color}
              onChange={(e) => handleChange("background_color", e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 hover:border-gray-400 shadow-sm"
              placeholder="#EFF4FF"
            />
            <div className="w-16 h-12 rounded-xl border-2 border-gray-300 shadow-inner overflow-hidden">
              <div
                className="w-full h-full transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: formData.background_color }}
              >
                <span className="text-xs font-medium text-gray-700 drop-shadow-sm">
                  معاينة
                </span>
              </div>
            </div>
          </div>
        </div>

        <Input
          label="لون الحدود"
          value={formData.border_color}
          onChange={(e) => handleChange("border_color", e.target.value)}
          placeholder="blue-200 أو #E5E7EB"
        />

        <Input
          label="لون السعر"
          value={formData.price_color}
          onChange={(e) => handleChange("price_color", e.target.value)}
          placeholder="blue-600"
        />

        <Input
          label="لون الأيقونات"
          value={formData.icon_color}
          onChange={(e) => handleChange("icon_color", e.target.value)}
          placeholder="green-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="تدرج الزر - البداية"
            value={formData.button_gradient_from}
            onChange={(e) =>
              handleChange("button_gradient_from", e.target.value)
            }
            placeholder="blue-400"
          />

          <Input
            label="تدرج الزر - النهاية"
            value={formData.button_gradient_to}
            onChange={(e) => handleChange("button_gradient_to", e.target.value)}
            placeholder="blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="ترتيب العرض"
            type="number"
            value={formData.order}
            onChange={(e) =>
              handleChange("order", parseInt(e.target.value) || 0)
            }
            placeholder="0"
          />

          <div className="flex items-center mt-8">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <span className="mr-3 text-sm font-semibold text-gray-700">
                🟢 نشطة ومتاحة للعرض
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="md:col-span-2 mt-6">
        <h4 className="text-md font-semibold text-gray-800 border-b pb-2 mb-4">
          مميزات الخطة
        </h4>
        <FeaturesList
          features={formData.features || []}
          onChange={(features) => handleChange("features", features)}
        />
      </div>

      {/* Action Buttons */}
      <div className="md:col-span-2 flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="success"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          className="px-8 py-4 text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {isEdit ? "💾 حفظ التغييرات" : "✨ إضافة الخطة"}
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-4 text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-gray-300 hover:border-gray-400"
        >
          ❌ إلغاء
        </Button>
      </div>
    </div>
  );
};
