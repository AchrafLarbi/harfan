import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { contentService } from "../../../../services/contentApi";

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

export const useContentManager = () => {
  const { token } = useSelector((state) => state.auth);
  const [content, setContent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const fetchContent = useCallback(async () => {
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
      showError(
        "فشل في تحميل المحتوى: " +
          (error.response?.data?.detail || error.message)
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSection = async (sectionType, sectionData) => {
    try {
      setActionLoading(true);

      let sectionId, updateData;
      if (sectionType === "about") {
        sectionId = content.about.id;
        updateData = {
          section_type: "about",
          about_title_main: sectionData.title_main,
          about_title_highlighted: sectionData.title_highlighted,
          about_title_secondary: sectionData.title_secondary,
          about_description: sectionData.description,
          about_badge_text: sectionData.badge_text,
        };
      } else if (sectionType === "plans") {
        sectionId = content.plans_section.id;
        updateData = {
          section_type: "plans",
          plans_title_main: sectionData.title_main,
          plans_title_highlighted: sectionData.title_highlighted,
          plans_title_secondary: sectionData.title_secondary,
          plans_description: sectionData.description,
          plans_badge_text: sectionData.badge_text,
        };
      }

      const updatedSection = await contentService.updateLandingPageSection(
        sectionId,
        updateData,
        token
      );

      // Update local state
      if (sectionType === "about") {
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
      } else if (sectionType === "plans") {
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

      showSuccess("تم حفظ التغييرات بنجاح");
      return true;
    } catch (error) {
      console.error("Error saving section:", error);
      showError(
        "فشل في حفظ التغييرات: " +
          (error.response?.data?.detail || error.message)
      );
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updatePlan = async (planData) => {
    try {
      setActionLoading(true);
      const updatedPlan = await contentService.updatePlan(
        planData.id,
        planData,
        token
      );

      setPlans((prev) =>
        prev.map((plan) => (plan.id === planData.id ? updatedPlan : plan))
      );

      showSuccess("تم حفظ الخطة بنجاح");
      return true;
    } catch (error) {
      console.error("Error saving plan:", error);
      showError(
        "فشل في حفظ الخطة: " + (error.response?.data?.detail || error.message)
      );
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const createPlan = async (planData) => {
    try {
      setActionLoading(true);
      const createdPlan = await contentService.createPlan(planData, token);
      setPlans((prev) => [...prev, createdPlan]);
      showSuccess("تم إضافة الخطة بنجاح");
      return true;
    } catch (error) {
      console.error("Error creating plan:", error);
      showError(
        "فشل في إضافة الخطة: " + (error.response?.data?.detail || error.message)
      );
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deletePlan = async (planId) => {
    try {
      setActionLoading(true);
      await contentService.deletePlan(planId, token);
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
      showSuccess("تم حذف الخطة بنجاح");
      return true;
    } catch (error) {
      console.error("Error deleting plan:", error);
      showError(
        "فشل في حذف الخطة: " + (error.response?.data?.detail || error.message)
      );
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
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
    fetchContent,
    DEFAULT_PLAN,
  };
};
