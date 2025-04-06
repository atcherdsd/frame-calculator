import React from 'react';

interface ButtonProps {
    readonly children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'submit', disabled = false, className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
