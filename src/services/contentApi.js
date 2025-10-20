import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/"
}api/content`;

// Create axios instance for content API
const contentAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Landing Page Content Services
export const contentService = {
  // Get all landing page content
  getLandingPageContent: async () => {
    try {
      const response = await contentAPI.get("/sections/get_content/");
      return response.data;
    } catch (error) {
      console.error("Error fetching landing page content:", error);
      throw error;
    }
  },

  // Get about section content only
  getAboutContent: async () => {
    try {
      const response = await contentAPI.get("/sections/about/");
      return response.data;
    } catch (error) {
      console.error("Error fetching about content:", error);
      throw error;
    }
  },

  // Get plans section content only
  getPlansContent: async () => {
    try {
      const response = await contentAPI.get("/sections/plans_content/");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans content:", error);
      throw error;
    }
  },

  // Get plans by category
  getPlansByCategory: async () => {
    try {
      const response = await contentAPI.get("/plans/by_category/");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans by category:", error);
      throw error;
    }
  },

  // Get all plans
  getAllPlans: async () => {
    try {
      const response = await contentAPI.get("/plans/");
      return response.data;
    } catch (error) {
      console.error("Error fetching all plans:", error);
      throw error;
    }
  },

  // Admin only functions (require authentication)
  updateLandingPageSection: async (sectionId, data, token) => {
    try {
      const response = await contentAPI.put(`/sections/${sectionId}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating landing page section:", error);
      throw error;
    }
  },

  updatePlan: async (planId, data, token) => {
    try {
      const response = await contentAPI.put(`/plans/${planId}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      throw error;
    }
  },

  createPlan: async (data, token) => {
    try {
      const response = await contentAPI.post(`/plans/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      throw error;
    }
  },

  deletePlan: async (planId, token) => {
    try {
      const response = await contentAPI.delete(`/plans/${planId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  },
};

export default contentService;
