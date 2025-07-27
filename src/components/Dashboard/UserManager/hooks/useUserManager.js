import { useState, useCallback } from "react";
import { userManagementAPI } from "../../../../services/userManagementApi";

export const useUserManager = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userManagementAPI.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || "خطأ في تحميل قائمة الطلاب");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userManagementAPI.getTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err.message || "خطأ في تحميل قائمة الأساتذة");
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentById = useCallback(async (studentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await userManagementAPI.getStudentById(studentId);
      return data;
    } catch (err) {
      setError(err.message || "خطأ في تحميل بيانات الطالب");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeacherById = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await userManagementAPI.getTeacherById(teacherId);
      return data;
    } catch (err) {
      setError(err.message || "خطأ في تحميل بيانات الأستاذ");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const activateTeacher = useCallback(async (teacherId) => {
    try {
      const response = await userManagementAPI.activateTeacher(teacherId);

      // Update the teacher in the local state
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === teacherId
            ? { ...teacher, is_active: !teacher.is_active }
            : teacher
        )
      );

      return response;
    } catch (err) {
      setError(err.message || "خطأ في تغيير حالة الأستاذ");
      throw err;
    }
  }, []);

  return {
    students,
    teachers,
    loading,
    error,
    fetchStudents,
    fetchTeachers,
    getStudentById,
    getTeacherById,
    activateTeacher,
    setError,
  };
};
