import React, { useState, useEffect } from "react";
import { useUserManager } from "../hooks/useUserManager";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

const TeachersManager = () => {
  const { teachers, loading, error, fetchTeachers, activateTeacher } =
    useUserManager();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.specialty &&
        teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleActivateTeacher = async (teacherId) => {
    try {
      await activateTeacher(teacherId);
      // Refresh the teachers list
      fetchTeachers();
    } catch (error) {
      console.error("Error activating teacher:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            خطأ في تحميل البيانات
          </h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => fetchTeachers()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const activeTeachers = filteredTeachers.filter(
    (teacher) => teacher.is_active
  );
  const inactiveTeachers = filteredTeachers.filter(
    (teacher) => !teacher.is_active
  );

  return (
    <div className="p-6">
      {/* Header with search */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            قائمة الأساتذة ({teachers.length})
          </h2>
          <div className="flex space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              نشط: {activeTeachers.length}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              غير نشط: {inactiveTeachers.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="البحث عن أستاذ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Teachers sections */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد أساتذة
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "لم يتم العثور على أساتذة يطابقون البحث"
              : "لا توجد أساتذة مسجلين حالياً"}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Inactive Teachers - Show first for admin action */}
          {inactiveTeachers.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm mr-2">
                  يتطلب موافقة
                </span>
                الأساتذة غير المفعلين ({inactiveTeachers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inactiveTeachers.map((teacher) => (
                  <UserCard
                    key={teacher.id}
                    user={teacher}
                    userType="teacher"
                    onActivate={() => handleActivateTeacher(teacher.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Active Teachers */}
          {activeTeachers.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2">
                  نشط
                </span>
                الأساتذة المفعلون ({activeTeachers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTeachers.map((teacher) => (
                  <UserCard
                    key={teacher.id}
                    user={teacher}
                    userType="teacher"
                    onActivate={() => handleActivateTeacher(teacher.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeachersManager;
