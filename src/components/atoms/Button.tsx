import type React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger";
	type?: "button" | "submit" | "reset";
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	disabled = false,
	variant = "primary",
	type = "button",
	className = "",
}) => {
	const baseClasses =
		"px-4 py-2 rounded font-medium transition-colors duration-200";

	const variantClasses = {
		primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300",
		secondary:
			"bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
		danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
		>
			{children}
		</button>
	);
};
