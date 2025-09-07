import React from "react";
import { Checkbox } from "../atoms/Checkbox";
import { Button } from "../atoms/Button";
import { Todo } from "../../types/Todo";

interface TodoRowProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoRow: React.FC<TodoRowProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-600">{todo.id}</td>
      <td className="px-4 py-3">
        <span
          className={`text-sm ${
            todo.completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {todo.title}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(todo)}
            className="text-xs px-2 py-1"
          >
            編集
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(todo.id)}
            className="text-xs px-2 py-1"
          >
            削除
          </Button>
        </div>
      </td>
    </tr>
  );
};
