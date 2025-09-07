import React, { useState } from "react";
import { Modal } from "../molecules/Modal";
import { TodoForm } from "../molecules/TodoForm";
import { Todo } from "../../types/Todo";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => Promise<void>;
  initialTodo?: Todo;
  isLoading?: boolean;
  error?: string;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTodo,
  isLoading = false,
  error,
}) => {
  const handleSubmit = async (title: string) => {
    try {
      await onSubmit(title);
      onClose();
    } catch (err) {
      // Error handling is done in the parent component
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTodo ? "タスクを編集" : "新規タスク作成"}
    >
      <TodoForm
        initialTitle={initialTodo?.title || ""}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isLoading}
        error={error}
        isEditMode={!!initialTodo}
      />
    </Modal>
  );
};
