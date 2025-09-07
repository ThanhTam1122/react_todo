import type React from "react";
import { useEffect } from "react";

interface ToastProps {
	message: string;
	type: "success" | "error" | "info";
	onClose: () => void;
	duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
	message,
	type,
	onClose,
	duration = 3000,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [onClose, duration]);

	const typeClasses = {
		success: "bg-green-500 text-white",
		error: "bg-red-500 text-white",
		info: "bg-blue-500 text-white",
	};

	return (
		<div
			className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${typeClasses[type]}`}
		>
			<div className="flex items-center justify-between">
				<span>{message}</span>
				<button
					onClick={onClose}
					className="ml-4 text-white hover:text-gray-200"
				>
					×
				</button>
			</div>
		</div>
	);
};
