import React, { useState } from "react";
import { Button, Modal } from "./UIComponents";
import { PlanCard } from "./PlanCard";
import { PlanForm } from "./PlanForm";

export const PlansManager = ({
  plans,
  onCreatePlan,
  onUpdatePlan,
  onDeletePlan,
  loading,
  defaultPlan,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleAddPlan = () => {
    setShowAddModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleCreatePlan = async (planData) => {
    const success = await onCreatePlan(planData);
    if (success) {
      setShowAddModal(false);
    }
  };

  const handleUpdatePlan = async (planData) => {
    const success = await onUpdatePlan(planData);
    if (success) {
      setEditingPlan(null);
    }
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">إدارة الخطط</h2>
        </div>
        <Button
          variant="success"
          onClick={handleAddPlan}
          loading={loading}
          className="flex items-center space-x-2 hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3 text-lg font-semibold"
        >
          <span>✨ إضافة خطة جديدة</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 shadow-sm"
          >
            <PlanCard
              plan={plan}
              onEdit={handleEditPlan}
              onDelete={onDeletePlan}
              loading={loading}
            />
          </div>
        ))}

        {plans.length === 0 && (
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <div className="text-gray-500 text-lg mb-4">
              📋 لا توجد خطط متاحة حالياً
            </div>
            <p className="text-gray-400 mb-6">
              ابدأ بإضافة خطة جديدة لعرضها للمستخدمين
            </p>
            <Button
              variant="primary"
              onClick={handleAddPlan}
              className="hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg font-semibold"
            >
              🚀 إضافة أول خطة
            </Button>
          </div>
        )}
      </div>

      {/* Add Plan Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleCancelAdd}
        title="إضافة خطة جديدة"
        size="xl"
      >
        <PlanForm
          planData={defaultPlan}
          onSave={handleCreatePlan}
          onCancel={handleCancelAdd}
          loading={loading}
          isEdit={false}
        />
      </Modal>

      {/* Edit Plan Modal */}
      <Modal
        isOpen={!!editingPlan}
        onClose={handleCancelEdit}
        title={`تعديل الخطة - ${editingPlan?.name_arabic || ""}`}
        size="xl"
      >
        {editingPlan && (
          <PlanForm
            planData={editingPlan}
            onSave={handleUpdatePlan}
            onCancel={handleCancelEdit}
            loading={loading}
            isEdit={true}
          />
        )}
      </Modal>
    </div>
  );
};
