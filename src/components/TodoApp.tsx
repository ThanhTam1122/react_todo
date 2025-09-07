import React, { useState, useEffect } from "react";
import { Button } from "./atoms/Button";
import { TodoTable } from "./organisms/TodoTable";
import { TodoModal } from "./organisms/TodoModal";
import { ConfirmDialog } from "./molecules/ConfirmDialog";
import { Toast } from "./atoms/Toast";
import { Todo } from "@/types/Todo";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    todoId: number | null;
    todoTitle: string;
  }>({
    isOpen: false,
    todoId: null,
    todoTitle: "",
  });

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      showToast("タスクの取得に失敗しました", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ show: true, message, type });
  };

  const handleCreateTodo = async (title: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create todo");
      }

      showToast("タスクを作成しました", "success");
      await fetchTodos(); // Refresh the list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "タスクの作成に失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (title: string) => {
    if (!editingTodo) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/todos/${editingTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }

      showToast("タスクを更新しました", "success");
      await fetchTodos(); // Refresh the list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "タスクの更新に失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const originalCompleted = todo.completed;

    // Optimistically update the UI
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle todo completion");
      }

      // Refresh the list to ensure consistency
      await fetchTodos();
    } catch (err) {
      console.error("Error toggling todo completion:", err);
      // Rollback the optimistic update
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === id ? { ...t, completed: originalCompleted } : t
        )
      );
      showToast("タスクの状態更新に失敗しました", "error");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      showToast("タスクを削除しました", "success");
      await fetchTodos(); // Refresh the list
    } catch (err) {
      console.error("Error deleting todo:", err);
      showToast("タスクの削除に失敗しました", "error");
    } finally {
      setIsLoading(false);
      setDeleteConfirm({ isOpen: false, todoId: null, todoTitle: "" });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingTodo(undefined);
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(undefined);
    setError("");
  };

  const handleDeleteClick = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setDeleteConfirm({
        isOpen: true,
        todoId: id,
        todoTitle: todo.title,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.todoId) {
      handleDeleteTodo(deleteConfirm.todoId);
    }
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm({ isOpen: false, todoId: null, todoTitle: "" });
  };

  const handleSubmit = editingTodo ? handleUpdateTodo : handleCreateTodo;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          TODO アプリケーション
        </h1>
        <Button onClick={handleOpenCreateModal}>新規作成</Button>
      </div>

      <TodoTable
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTodo}
        onDelete={handleDeleteClick}
      />

      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialTodo={editingTodo}
        isLoading={isLoading}
        error={error}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="タスクの削除"
        message={`「${deleteConfirm.todoTitle}」を削除しますか？この操作は取り消せません。`}
        confirmText="削除"
        cancelText="キャンセル"
        isLoading={isLoading}
      />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};
