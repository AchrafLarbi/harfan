import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaCogs, FaClipboardList } from "react-icons/fa";
import DashboardLayout from "../DashboardLayout";
import { LoadingSpinner, AlertMessage } from "./components/UIComponents";
import { SectionManager } from "./components/SectionManager";
import { PlansManager } from "./components/PlansManager";
import {
  fetchContentAndPlans,
  updateSection,
  updatePlan,
  createPlan,
  deletePlan,
  setEditingSection,
  clearEditingSection,
  clearMessages,
  selectContent,
  selectPlans,
  selectContentLoading,
  selectActionLoading,
  selectContentError,
  selectContentSuccess,
  selectEditingSection,
  selectIsCacheFresh,
} from "../../../store/slices/contentManagementSlice";

const DEFAULT_PLAN = {
  plan_type: "monthly_individual",
  plan_category: "regular",
  name_arabic: "",
  price: 0,
  currency: "ريال",
  duration_text: "",
  badge_text: "",
  features: [],
  button_text: "اشترك الآن",
  background_color: "#EFF4FF",
  border_color: "blue-200",
  button_gradient_from: "blue-400",
  button_gradient_to: "blue-500",
  icon_color: "green-500",
  price_color: "blue-600",
  order: 0,
  is_active: true,
};

const AdminContentManager = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const content = useSelector(selectContent);
  const plans = useSelector(selectPlans);
  const loading = useSelector(selectContentLoading);
  const actionLoading = useSelector(selectActionLoading);
  const error = useSelector(selectContentError);
  const success = useSelector(selectContentSuccess);
  const editingSection = useSelector(selectEditingSection);
  const isCacheFresh = useSelector(selectIsCacheFresh);

  // Fetch content on mount or if cache is stale
  useEffect(() => {
    if (!content || !isCacheFresh) {
      dispatch(fetchContentAndPlans());
    }
  }, [dispatch, content, isCacheFresh]);

  // Auto-clear messages after some time
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  const handleEditAboutSection = () => {
    dispatch(
      setEditingSection({
        type: "about",
        data: { ...content.about },
      })
    );
  };

  const handleEditPlansSection = () => {
    dispatch(
      setEditingSection({
        type: "plans",
        data: { ...content.plans_section },
      })
    );
  };

  const handleSectionSave = async (sectionData) => {
    const result = await dispatch(
      updateSection({
        sectionType: editingSection.type,
        sectionData,
      })
    );

    if (updateSection.fulfilled.match(result)) {
      dispatch(clearEditingSection());
    }
  };

  const handleCancelSectionEdit = () => {
    dispatch(clearEditingSection());
  };

  const handleUpdatePlan = async (planData) => {
    const result = await dispatch(updatePlan(planData));
    return updatePlan.fulfilled.match(result);
  };

  const handleCreatePlan = async (planData) => {
    const result = await dispatch(createPlan(planData));
    return createPlan.fulfilled.match(result);
  };

  const handleDeletePlan = async (planId) => {
    const result = await dispatch(deletePlan(planId));
    return deletePlan.fulfilled.match(result);
  };

  return (
    <DashboardLayout activeTab="content">
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                    <FaCogs className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      إدارة محتوى الصفحة الرئيسية
                    </h1>
                    <p className="text-gray-600 text-lg">
                      تحكم في محتوى الموقع وإدارة الخطط والأقسام
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 text-sm font-medium">
                    متصل
                  </span>
                </div>
              </div>

              {error && <AlertMessage type="error" message={error} />}

              {success && <AlertMessage type="success" message={success} />}
            </div>

            {/* Content Sections */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* About Section Management */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-4">
                  <FaEdit className="text-blue-600 text-xl group-hover:text-blue-700 transition-colors" />
                  <span className="text-blue-700 text-sm font-semibold uppercase tracking-wide">
                    قسم المحتوى
                  </span>
                </div>
                <SectionManager
                  title="قسم من نحن"
                  sectionData={content?.about}
                  onEdit={handleEditAboutSection}
                  editing={editingSection?.type === "about"}
                  onSave={handleSectionSave}
                  onCancelEdit={handleCancelSectionEdit}
                  loading={actionLoading}
                />
              </div>

              {/* Plans Section Management */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-4">
                  <FaCogs className="text-green-600 text-xl group-hover:text-green-700 transition-colors" />
                  <span className="text-green-700 text-sm font-semibold uppercase tracking-wide">
                    إعدادات الخطط
                  </span>
                </div>
                <SectionManager
                  title="قسم الخطط"
                  sectionData={content?.plans_section}
                  onEdit={handleEditPlansSection}
                  editing={editingSection?.type === "plans"}
                  onSave={handleSectionSave}
                  onCancelEdit={handleCancelSectionEdit}
                  loading={actionLoading}
                />
              </div>
            </div>

            {/* Plans Management */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <FaClipboardList className="text-purple-600 text-xl group-hover:text-purple-700 transition-colors" />
                <span className="text-purple-700 text-sm font-semibold uppercase tracking-wide">
                  إدارة الخطط
                </span>
              </div>
              <PlansManager
                plans={plans}
                onCreatePlan={handleCreatePlan}
                onUpdatePlan={handleUpdatePlan}
                onDeletePlan={handleDeletePlan}
                loading={actionLoading}
                defaultPlan={DEFAULT_PLAN}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminContentManager;
