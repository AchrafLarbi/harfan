import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contentService } from "../services/contentApi";
import DashboardLayout from "./Dashboard/DashboardLayout";

const AdminContentManager = () => {
  const { token } = useSelector((state) => state.auth);
  const [content, setContent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const [contentData, plansData] = await Promise.all([
        contentService.getLandingPageContent(),
        contentService.getAllPlans(),
      ]);
      setContent(contentData);
      setPlans(plansData);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError(
        "فشل في تحميل المحتوى: " +
          (error.response?.data?.detail || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSectionEdit = (sectionType) => {
    if (sectionType === "about") {
      setEditingSection({
        type: "about",
        data: { ...content.about },
      });
    } else if (sectionType === "plans") {
      setEditingSection({
        type: "plans",
        data: { ...content.plans_section },
      });
    }
  };

  const handlePlanEdit = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSectionSave = async () => {
    try {
      setLoading(true);

      // Determine section ID and prepare data based on type
      let sectionId, updateData;
      if (editingSection.type === "about") {
        sectionId = content.about.id;
        updateData = {
          section_type: "about",
          about_title_main: editingSection.data.title_main,
          about_title_highlighted: editingSection.data.title_highlighted,
          about_title_secondary: editingSection.data.title_secondary,
          about_description: editingSection.data.description,
          about_badge_text: editingSection.data.badge_text,
        };
      } else if (editingSection.type === "plans") {
        sectionId = content.plans_section.id;
        updateData = {
          section_type: "plans",
          plans_title_main: editingSection.data.title_main,
          plans_title_highlighted: editingSection.data.title_highlighted,
          plans_title_secondary: editingSection.data.title_secondary,
          plans_description: editingSection.data.description,
          plans_badge_text: editingSection.data.badge_text,
        };
      }

      // Call backend API to update the section
      const updatedSection = await contentService.updateLandingPageSection(
        sectionId,
        updateData,
        token
      );

      // Update local state with response from backend
      if (editingSection.type === "about") {
        setContent((prev) => ({
          ...prev,
          about: {
            id: updatedSection.id,
            title_main: updatedSection.about_title_main,
            title_highlighted: updatedSection.about_title_highlighted,
            title_secondary: updatedSection.about_title_secondary,
            description: updatedSection.about_description,
            badge_text: updatedSection.about_badge_text,
          },
        }));
      } else if (editingSection.type === "plans") {
        setContent((prev) => ({
          ...prev,
          plans_section: {
            id: updatedSection.id,
            title_main: updatedSection.plans_title_main,
            title_highlighted: updatedSection.plans_title_highlighted,
            title_secondary: updatedSection.plans_title_secondary,
            description: updatedSection.plans_description,
            badge_text: updatedSection.plans_badge_text,
          },
        }));
      }

      setEditingSection(null);
      setSuccess("تم حفظ التغييرات بنجاح");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error saving section:", error);
      setError(
        "فشل في حفظ التغييرات: " +
          (error.response?.data?.detail || error.message)
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSave = async () => {
    try {
      setLoading(true);

      // Call backend API to update the plan
      const updatedPlan = await contentService.updatePlan(
        editingPlan.id,
        editingPlan,
        token
      );

      // Update local state with response from backend
      setPlans((prev) =>
        prev.map((plan) => (plan.id === editingPlan.id ? updatedPlan : plan))
      );

      setEditingPlan(null);
      setSuccess("تم حفظ الخطة بنجاح");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error saving plan:", error);
      setError(
        "فشل في حفظ الخطة: " + (error.response?.data?.detail || error.message)
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout activeTab="content">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            إدارة محتوى الصفحة الرئيسية
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* About Section Management */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                قسم من نحن
              </h2>
              <button
                onClick={() => handleSectionEdit("about")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                تعديل
              </button>
            </div>

            {editingSection && editingSection.type === "about" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نص الشارة
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.badge_text}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, badge_text: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان الرئيسي
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_main}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, title_main: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان المميز
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_highlighted}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          title_highlighted: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان الثانوي
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_secondary}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, title_secondary: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={editingSection.data.description}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, description: e.target.value },
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSectionSave}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <strong>نص الشارة:</strong> {content?.about?.badge_text}
                </p>
                <p>
                  <strong>العنوان:</strong> {content?.about?.title_main}{" "}
                  {content?.about?.title_highlighted}{" "}
                  {content?.about?.title_secondary}
                </p>
                <p>
                  <strong>الوصف:</strong>{" "}
                  {content?.about?.description?.substring(0, 100)}...
                </p>
              </div>
            )}
          </div>

          {/* Plans Section Management */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                قسم الخطط
              </h2>
              <button
                onClick={() => handleSectionEdit("plans")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                تعديل
              </button>
            </div>

            {editingSection && editingSection.type === "plans" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نص الشارة
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.badge_text}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, badge_text: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان الرئيسي
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_main}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, title_main: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان المميز
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_highlighted}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          title_highlighted: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان الثانوي
                  </label>
                  <input
                    type="text"
                    value={editingSection.data.title_secondary}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, title_secondary: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={editingSection.data.description}
                    onChange={(e) =>
                      setEditingSection((prev) => ({
                        ...prev,
                        data: { ...prev.data, description: e.target.value },
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSectionSave}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <strong>نص الشارة:</strong>{" "}
                  {content?.plans_section?.badge_text}
                </p>
                <p>
                  <strong>العنوان:</strong> {content?.plans_section?.title_main}{" "}
                  {content?.plans_section?.title_highlighted}{" "}
                  {content?.plans_section?.title_secondary}
                </p>
                <p>
                  <strong>الوصف:</strong> {content?.plans_section?.description}
                </p>
              </div>
            )}
          </div>

          {/* Plans Management */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              إدارة الخطط
            </h2>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {plan.name_arabic}
                      </h3>
                      <p className="text-gray-600">
                        {plan.currency}
                        {plan.price} {plan.duration_text}
                      </p>
                      <p className="text-sm text-gray-500">
                        الفئة:{" "}
                        {plan.plan_category === "regular" ? "عادية" : "خاصة"}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlanEdit(plan)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      تعديل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Edit Modal */}
          {editingPlan && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  تعديل الخطة
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخطة
                    </label>
                    <input
                      type="text"
                      value={editingPlan.name_arabic}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          name_arabic: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر
                    </label>
                    <input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص المدة
                    </label>
                    <input
                      type="text"
                      value={editingPlan.duration_text}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          duration_text: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handlePlanSave}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingPlan(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminContentManager;
