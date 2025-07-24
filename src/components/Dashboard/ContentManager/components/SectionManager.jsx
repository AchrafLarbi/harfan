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
    <div className="space-y-4">
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

      <div className="flex gap-4">
        <Button variant="success" onClick={handleSubmit} loading={loading}>
          حفظ
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
      </div>
    </div>
  );
};

const SectionDisplay = ({ sectionData }) => (
  <div className="bg-gray-50 p-4 rounded-md">
    <p>
      <strong>نص الشارة:</strong> {sectionData?.badge_text}
    </p>
    <p>
      <strong>العنوان:</strong> {sectionData?.title_main}{" "}
      {sectionData?.title_highlighted} {sectionData?.title_secondary}
    </p>
    <p>
      <strong>الوصف:</strong> {sectionData?.description?.substring(0, 100)}
      {sectionData?.description?.length > 100 ? "..." : ""}
    </p>
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
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <Button onClick={onEdit}>تعديل</Button>
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
