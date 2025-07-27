import React, { useState } from "react";

const UserCard = ({ user, userType, onActivate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  const getStatusBadge = () => {
    if (userType === "teacher") {
      return user.is_active ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          نشط
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          غير نشط
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        طالب
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* User Info */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              {userType === "teacher" && user.specialty && (
                <p className="text-xs text-gray-600 mt-1">{user.specialty}</p>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0">{getStatusBadge()}</div>
        </div>

        {/* Basic Info */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">رقم المستخدم:</span>
            <span className="text-gray-900">#{user.id}</span>
          </div>

          {user.phone_number && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">الهاتف:</span>
              <span className="text-gray-900">{user.phone_number}</span>
            </div>
          )}

          {user.country && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">البلد:</span>
              <span className="text-gray-900">{user.country}</span>
            </div>
          )}
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm mb-2">
                الصورة الشخصية:
              </span>
              {user.profile_picture_url ? (
                <img
                  className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                  src={user.profile_picture_url}
                  alt={`${user.first_name} ${user.last_name}`}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-200">
                  <svg
                    className="h-8 w-8 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Other Details */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">تاريخ الميلاد:</span>
                <span className="text-gray-900">
                  {formatDate(user.date_of_birth)}
                </span>
              </div>

              {userType === "teacher" && (
                <>
                  {user.years_of_experience && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">سنوات الخبرة:</span>
                      <span className="text-gray-900">
                        {user.years_of_experience} سنة
                      </span>
                    </div>
                  )}

                  {user.cv_url && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">السيرة الذاتية:</span>
                      <a
                        href={user.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        عرض الملف
                      </a>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">حالة الموظف:</span>
                <span className="text-gray-900">
                  {user.is_staff ? "موظف" : "مستخدم عادي"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isExpanded ? "إخفاء التفاصيل" : "عرض المزيد"}
          </button>

          {userType === "teacher" && onActivate && (
            <button
              onClick={onActivate}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                user.is_active
                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              {user.is_active ? "إلغاء التفعيل" : "تفعيل الحساب"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
