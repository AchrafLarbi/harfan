import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contentService } from "../../services/contentApi";
import DashboardLayout from "./DashboardLayout";

const AdminContentManager = () => {
  const { token } = useSelector((state) => state.auth);
  const [content, setContent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [addingPlan, setAddingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name_arabic: "",
    name_english: "",
    price: 0,
    currency: "ريال",
    duration_text: "",
    plan_type: "monthly_individual",
    plan_category: "regular",
    badge_text: "",
    features: [],
    button_text: "ابدأ الآن",
    background_color: "#ffffff",
    border_color: "#e5e7eb",
    price_color: "blue-600",
    icon_color: "green-500",
    button_gradient_from: "blue-400",
    button_gradient_to: "blue-500",
    order: 1,
    is_active: true,
  });

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

  const handleAddPlan = () => {
    setAddingPlan(true);
  };

  const handleNewPlanSave = async () => {
    try {
      setLoading(true);

      // Call backend API to create the new plan
      const createdPlan = await contentService.createPlan(newPlan, token);

      // Add new plan to local state
      setPlans((prev) => [...prev, createdPlan]);

      // Reset form
      setNewPlan({
        name_arabic: "",
        name_english: "",
        price: 0,
        currency: "ريال",
        duration_text: "",
        plan_type: "monthly_individual",
        plan_category: "regular",
        badge_text: "",
        features: [],
        button_text: "ابدأ الآن",
        background_color: "#ffffff",
        border_color: "#e5e7eb",
        price_color: "blue-600",
        icon_color: "green-500",
        button_gradient_from: "blue-400",
        button_gradient_to: "blue-500",
        order: 1,
        is_active: true,
      });
      setAddingPlan(false);
      setSuccess("تم إضافة الخطة بنجاح");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error creating plan:", error);
      setError(
        "فشل في إضافة الخطة: " + (error.response?.data?.detail || error.message)
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الخطة؟")) {
      return;
    }

    try {
      setLoading(true);

      // Call backend API to delete the plan
      await contentService.deletePlan(planId, token);

      // Remove plan from local state
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));

      setSuccess("تم حذف الخطة بنجاح");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError(
        "فشل في حذف الخطة: " + (error.response?.data?.detail || error.message)
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                إدارة الخطط
              </h2>
              <button
                onClick={handleAddPlan}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                إضافة خطة جديدة
              </button>
            </div>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
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
                      {plan.badge_text && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                          {plan.badge_text}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlanEdit(plan)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        حذف
                      </button>
                    </div>
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
                      اسم الخطة (عربي)
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
                      اسم الخطة (إنجليزي)
                    </label>
                    <input
                      type="text"
                      value={editingPlan.name_english || ""}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          name_english: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        العملة
                      </label>
                      <select
                        value={editingPlan.currency || "ريال"}
                        onChange={(e) =>
                          setEditingPlan((prev) => ({
                            ...prev,
                            currency: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="ريال">ريال</option>
                        <option value="$">دولار</option>
                        <option value="€">يورو</option>
                      </select>
                    </div>
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
                      placeholder="مثال: شهريًا، سنويًا"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الخطة
                    </label>
                    <select
                      value={editingPlan.plan_type}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          plan_type: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="monthly_individual">شهرية فردية</option>
                      <option value="monthly_group">شهرية جماعية</option>
                      <option value="quarterly">ثلاثة أشهر</option>
                      <option value="semi_annual">ستة أشهر</option>
                      <option value="annual">سنوية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      فئة الخطة
                    </label>
                    <select
                      value={editingPlan.plan_category}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          plan_category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="regular">عادية</option>
                      <option value="special">خاصة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص الشارة
                    </label>
                    <input
                      type="text"
                      value={editingPlan.badge_text || ""}
                      onChange={(e) =>
                        setEditingPlan((prev) => ({
                          ...prev,
                          badge_text: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="مثال: الأكثر شعبية، موصى به"
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

          {/* Add New Plan Modal */}
          {addingPlan && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  إضافة خطة جديدة
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخطة (عربي) *
                    </label>
                    <input
                      type="text"
                      value={newPlan.name_arabic}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          name_arabic: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="مثال: اشتراك شهري فردي"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخطة (إنجليزي)
                    </label>
                    <input
                      type="text"
                      value={newPlan.name_english}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          name_english: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Example: Individual Monthly Plan"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        السعر *
                      </label>
                      <input
                        type="number"
                        value={newPlan.price}
                        onChange={(e) =>
                          setNewPlan((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العملة
                      </label>
                      <select
                        value={newPlan.currency}
                        onChange={(e) =>
                          setNewPlan((prev) => ({
                            ...prev,
                            currency: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="ريال">ريال</option>
                        <option value="$">دولار</option>
                        <option value="€">يورو</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص المدة *
                    </label>
                    <input
                      type="text"
                      value={newPlan.duration_text}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          duration_text: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="مثال: شهريًا، سنويًا"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الخطة *
                    </label>
                    <select
                      value={newPlan.plan_type}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          plan_type: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="monthly_individual">شهرية فردية</option>
                      <option value="monthly_group">شهرية جماعية</option>
                      <option value="quarterly">ثلاثة أشهر</option>
                      <option value="semi_annual">ستة أشهر</option>
                      <option value="annual">سنوية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      فئة الخطة
                    </label>
                    <select
                      value={newPlan.plan_category}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          plan_category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="regular">عادية</option>
                      <option value="special">خاصة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص الشارة
                    </label>
                    <input
                      type="text"
                      value={newPlan.badge_text}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          badge_text: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="مثال: الأكثر شعبية، موصى به"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص الزر
                    </label>
                    <input
                      type="text"
                      value={newPlan.button_text}
                      onChange={(e) =>
                        setNewPlan((prev) => ({
                          ...prev,
                          button_text: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="مثال: ابدأ الآن، اشترك الآن"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ترتيب العرض
                      </label>
                      <input
                        type="number"
                        value={newPlan.order}
                        onChange={(e) =>
                          setNewPlan((prev) => ({
                            ...prev,
                            order: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="1"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newPlan.is_active}
                          onChange={(e) =>
                            setNewPlan((prev) => ({
                              ...prev,
                              is_active: e.target.checked,
                            }))
                          }
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          نشطة
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleNewPlanSave}
                    disabled={!newPlan.name_arabic || !newPlan.duration_text || !newPlan.plan_type}
                    className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                  >
                    إضافة الخطة
                  </button>
                  <button
                    onClick={() => {
                      setAddingPlan(false);
                      setNewPlan({
                        name_arabic: "",
                        name_english: "",
                        price: 0,
                        currency: "ريال",
                        duration_text: "",
                        plan_type: "monthly_individual",
                        plan_category: "regular",
                        badge_text: "",
                        features: [],
                        button_text: "ابدأ الآن",
                        background_color: "#ffffff",
                        border_color: "#e5e7eb",
                        price_color: "blue-600",
                        icon_color: "green-500",
                        button_gradient_from: "blue-400",
                        button_gradient_to: "blue-500",
                        order: 1,
                        is_active: true,
                      });
                    }}
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
