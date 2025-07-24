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
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="أدخل ميزة الخطة"
          />
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeFeature(index)}
          >
            حذف
          </Button>
        </div>
      ))}
      <Button onClick={addFeature}>إضافة ميزة</Button>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            لون الخلفية
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.background_color}
              onChange={(e) => handleChange("background_color", e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={formData.background_color}
              onChange={(e) => handleChange("background_color", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="#EFF4FF"
            />
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
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">نشطة</span>
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
      <div className="md:col-span-2 flex gap-4 mt-8 pt-4 border-t">
        <Button
          variant="success"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          {isEdit ? "حفظ التغييرات" : "إضافة الخطة"}
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
      </div>
    </div>
  );
};
