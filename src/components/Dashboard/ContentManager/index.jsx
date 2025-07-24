import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { useContentManager } from "./hooks/useContentManager";
import { LoadingSpinner, AlertMessage } from "./components/UIComponents";
import { SectionManager } from "./components/SectionManager";
import { PlansManager } from "./components/PlansManager";

const AdminContentManager = () => {
  const {
    content,
    plans,
    loading,
    actionLoading,
    error,
    success,
    updateSection,
    updatePlan,
    createPlan,
    deletePlan,
    DEFAULT_PLAN,
  } = useContentManager();

  const [editingSection, setEditingSection] = useState(null);

  const handleEditAboutSection = () => {
    setEditingSection({
      type: "about",
      data: { ...content.about },
    });
  };

  const handleEditPlansSection = () => {
    setEditingSection({
      type: "plans",
      data: { ...content.plans_section },
    });
  };

  const handleSectionSave = async (sectionData) => {
    const success = await updateSection(editingSection.type, sectionData);
    if (success) {
      setEditingSection(null);
    }
  };

  const handleCancelSectionEdit = () => {
    setEditingSection(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout activeTab="content">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            إدارة محتوى الصفحة الرئيسية
          </h1>

          {error && <AlertMessage type="error" message={error} />}

          {success && <AlertMessage type="success" message={success} />}

          {/* About Section Management */}
          <SectionManager
            title="قسم من نحن"
            sectionData={content?.about}
            onEdit={handleEditAboutSection}
            editing={editingSection?.type === "about"}
            onSave={handleSectionSave}
            onCancelEdit={handleCancelSectionEdit}
            loading={actionLoading}
          />

          {/* Plans Section Management */}
          <SectionManager
            title="قسم الخطط"
            sectionData={content?.plans_section}
            onEdit={handleEditPlansSection}
            editing={editingSection?.type === "plans"}
            onSave={handleSectionSave}
            onCancelEdit={handleCancelSectionEdit}
            loading={actionLoading}
          />

          {/* Plans Management */}
          <PlansManager
            plans={plans}
            onCreatePlan={createPlan}
            onUpdatePlan={updatePlan}
            onDeletePlan={deletePlan}
            loading={actionLoading}
            defaultPlan={DEFAULT_PLAN}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminContentManager;
