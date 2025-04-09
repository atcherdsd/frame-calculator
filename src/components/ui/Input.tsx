import React from 'react';

interface InputProps {
    label?: string;
    type?: 'text' | 'number';
    value: string | number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    name?: string;
    className?: string;
    hideLabel?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    type = 'number',
    value,
    onChange,
    min,
    max,
    step = 0.01,
    required = false,
    name,
    className = '',
    hideLabel = false,
}) => {
    return (
        <>
            {label && !hideLabel && (
                <label htmlFor={name} className="text-lg font-semibold text-gray-800">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.valueAsNumber)}
                step={step}
                min={min}
                max={max}
                required={required}
                className={`p-2 border rounded ${className}`}
            />
        </>
    );
};

export default Input;
