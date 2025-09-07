import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

interface TodoFormProps {
  initialTitle?: string;
  onSubmit: (title: string) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
  isEditMode?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  initialTitle = "",
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  isEditMode = false,
}) => {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await onSubmit(title.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          タイトル
        </label>
        <Input
          value={title}
          onChange={setTitle}
          placeholder="タスクのタイトルを入力してください"
          disabled={isLoading}
          className="w-full"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          キャンセル
        </Button>
        <Button type="submit" disabled={!title.trim() || isLoading}>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span>{isEditMode ? "更新中..." : "作成中..."}</span>
            </div>
          ) : isEditMode ? (
            "更新"
          ) : (
            "作成"
          )}
        </Button>
      </div>
    </form>
  );
};
