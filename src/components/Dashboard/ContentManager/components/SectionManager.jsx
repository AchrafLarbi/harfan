import React, { useState } from "react";
import { Button, Input, Textarea } from "./UIComponents";

const SectionEditor = ({ sectionData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(sectionData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
      <Input
        label="نص الشارة"
        value={formData.badge_text}
        onChange={(e) => handleChange("badge_text", e.target.value)}
      />

      <Input
        label="العنوان الرئيسي"
        value={formData.title_main}
        onChange={(e) => handleChange("title_main", e.target.value)}
      />

      <Input
        label="العنوان المميز"
        value={formData.title_highlighted}
        onChange={(e) => handleChange("title_highlighted", e.target.value)}
      />

      <Input
        label="العنوان الثانوي"
        value={formData.title_secondary}
        onChange={(e) => handleChange("title_secondary", e.target.value)}
      />

      <Textarea
        label="الوصف"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={4}
      />

      <div className="flex gap-4 pt-4">
        <Button variant="success" onClick={handleSubmit} loading={loading}>
          حفظ التغييرات
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
      </div>
    </div>
  );
};

const SectionDisplay = ({ sectionData }) => (
  <div className="bg-white/60 backdrop-blur-sm border border-gray-200 p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-200 shadow-sm">
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">نص الشارة:</span>
        <span className="text-gray-800 font-semibold">
          {sectionData?.badge_text}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">العنوان:</span>
        <span className="text-gray-800 font-semibold">
          {sectionData?.title_main} {sectionData?.title_highlighted}{" "}
          {sectionData?.title_secondary}
        </span>
      </div>
      <div className="flex items-start space-x-3">
        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
        <span className="text-gray-600 font-medium">الوصف:</span>
        <span className="text-gray-700 leading-relaxed">
          {sectionData?.description?.substring(0, 100)}
          {sectionData?.description?.length > 100 ? "..." : ""}
        </span>
      </div>
    </div>
  </div>
);

export const SectionManager = ({
  title,
  sectionData,
  onEdit,
  editing,
  onSave,
  onCancelEdit,
  loading,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        {!editing && (
          <Button
            onClick={onEdit}
            variant="primary"
            className="flex items-center space-x-2 hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3 text-lg font-semibold"
          >
            <span>تعديل</span>
          </Button>
        )}
      </div>

      {editing ? (
        <SectionEditor
          sectionData={sectionData}
          onSave={onSave}
          onCancel={onCancelEdit}
          loading={loading}
        />
      ) : (
        <SectionDisplay sectionData={sectionData} />
      )}
    </div>
  );
};
