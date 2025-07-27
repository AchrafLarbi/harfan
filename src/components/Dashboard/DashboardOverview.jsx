import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaEdit, FaEye, FaChartLine } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout";
import {
  fetchDashboardStats,
  fetchRecentActivities,
  setMockData,
  selectDashboardStats,
  selectRecentActivities,
  selectStatsLoading,
  selectTimePeriod,
  selectLastUpdated,
} from "../../store/slices/dashboardSlice";
import {
  updateActivity,
  selectAdminSessionInfo,
} from "../../store/slices/adminSlice";

const DashboardOverview = () => {
  const dispatch = useDispatch();

  // Redux state
  const stats = useSelector(selectDashboardStats);
  const recentActivities = useSelector(selectRecentActivities);
  const isLoading = useSelector(selectStatsLoading);
  const timePeriod = useSelector(selectTimePeriod);
  const lastUpdated = useSelector(selectLastUpdated);
  const sessionInfo = useSelector(selectAdminSessionInfo);

  useEffect(() => {
    // Update admin activity
    dispatch(updateActivity());

    // Try to fetch real data, fallback to mock data
    dispatch(fetchDashboardStats(timePeriod))
      .unwrap()
      .catch(() => {
        // If API fails, use mock data for development
        dispatch(setMockData());
      });

    // Fetch recent activities
    dispatch(fetchRecentActivities(10))
      .unwrap()
      .catch(() => {
        // Mock activities are already set in setMockData
        console.log("Using mock activities data");
      });
  }, [dispatch, timePeriod]);

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: (stats.totalUsers || 0).toLocaleString(),
      icon: FaUsers,
      change: "+12%",
      changeType: "positive",
      color: "blue",
    },
    {
      title: "إجمالي الطلاب",
      value: (stats.totalStudents || 0).toLocaleString(),
      icon: FaUsers,
      change: `+${stats.newRegistrations || 0}`,
      changeType: "positive",
      color: "green",
    },
    {
      title: "إجمالي الأساتذة",
      value: (stats.totalTeachers || 0).toLocaleString(),
      icon: FaUsers,
      change: "+5",
      changeType: "positive",
      color: "purple",
    },
    {
      title: "محتوى الموقع",
      value: stats.totalContent || 0,
      icon: FaEdit,
      change: "+3",
      changeType: "positive",
      color: "green",
    },
    {
      title: "مشاهدات الصفحة",
      value: (stats.totalViews || 0).toLocaleString(),
      icon: FaEye,
      change: "+8.2%",
      changeType: "positive",
      color: "purple",
    },
    {
      title: "معدل النمو",
      value: `${stats.growthRate || 0}%`,
      icon: FaChartLine,
      change: "+2.1%",
      changeType: "positive",
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-blue-600 bg-blue-50",
      green: "bg-green-500 text-green-600 bg-green-50",
      purple: "bg-purple-500 text-purple-600 bg-purple-50",
      orange: "bg-orange-500 text-orange-600 bg-orange-50",
    };
    return colors[color] || colors.blue;
  };

  return (
    <DashboardLayout activeTab="overview">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            مرحباً بك في لوحة الإدارة
          </h2>
          <p className="text-gray-600">
            يمكنك من هنا إدارة محتوى الموقع ومراقبة الإحصائيات العامة
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const colorClass = getColorClasses(stat.color);
            const [, textColor, lightBgColor] = colorClass.split(" ");
            const Icon = stat.icon || FaEye;

            return (
              <div
                key={index}
                className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${lightBgColor} p-3 rounded-md`}>
                        <Icon className={`h-6 w-6 ${textColor}`} />
                      </div>
                    </div>
                    <div className="mr-4 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  </div>
                  {stat.change && (
                    <div className="mt-4">
                      <div className="flex items-center">
                        <div
                          className={`flex items-center text-sm ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <span>{stat.change}</span>
                          <span className="mr-1 text-gray-500">
                            من الشهر الماضي
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            الإجراءات السريعة
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => (window.location.href = "/admin/content")}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
            >
              <FaEdit className="h-8 w-8 text-blue-500 ml-3" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  تعديل محتوى الصفحة الرئيسية
                </p>
                <p className="text-xs text-gray-500">إدارة نصوص وخطط الموقع</p>
              </div>
            </button>

            <button
              onClick={() => (window.location.href = "/admin/users")}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
            >
              <FaUsers className="h-8 w-8 text-green-500 ml-3" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  إدارة المستخدمين
                </p>
                <p className="text-xs text-gray-500">
                  عرض وإدارة حسابات المستخدمين
                </p>
              </div>
            </button>

            <button
              onClick={() => (window.location.href = "/admin/analytics")}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
            >
              <FaChartLine className="h-8 w-8 text-purple-500 ml-3" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  مراجعة التحليلات
                </p>
                <p className="text-xs text-gray-500">
                  إحصائيات الاستخدام والنمو
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">النشاط الأخير</h3>
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                آخر تحديث: {new Date(lastUpdated).toLocaleString("ar-SA")}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="mr-3 text-gray-500">جاري التحميل...</span>
            </div>
          ) : recentActivities && recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.slice(0, 5).map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="flex items-center text-sm"
                >
                  <div
                    className={`flex-shrink-0 h-2 w-2 rounded-full ${
                      activity.type === "user_registration"
                        ? "bg-blue-400"
                        : activity.type === "content_update"
                        ? "bg-green-400"
                        : activity.type === "plan_update"
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <p className="mr-3 text-gray-600">{activity.message}</p>
                  <span className="mr-auto text-gray-400">
                    {activity.timestamp
                      ? new Date(activity.timestamp).toLocaleString("ar-SA", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })
                      : "الآن"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد أنشطة حديثة</p>
            </div>
          )}

          {sessionInfo?.activityCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                جلسة العمل الحالية: {sessionInfo.activityCount} نشاط
                {sessionInfo.lastActivity &&
                  ` • آخر نشاط: ${new Date(
                    sessionInfo.lastActivity
                  ).toLocaleTimeString("ar-SA")}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;
