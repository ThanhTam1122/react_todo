import React from 'react';
import { Modal } from './Modal';
import { Button } from '../atoms/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '削除',
  cancelText = 'キャンセル',
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? '削除中...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
