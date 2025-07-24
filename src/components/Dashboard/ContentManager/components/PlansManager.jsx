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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">إدارة الخطط</h2>
        <Button variant="success" onClick={handleAddPlan} loading={loading}>
          إضافة خطة جديدة
        </Button>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEditPlan}
            onDelete={onDeletePlan}
            loading={loading}
          />
        ))}

        {plans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد خطط مضافة بعد
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
