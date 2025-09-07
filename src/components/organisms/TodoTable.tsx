import React from "react";
import { TodoRow } from "../molecules/TodoRow";
import { Todo } from "../../types/Todo";

interface TodoTableProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  if (todos.length === 0) {
    return <div className="text-center py-8 text-gray-500">タスクなし</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              タイトル
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              完了
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
