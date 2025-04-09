import React from 'react';

export interface SelectorOption {
    value: string;
    text: string;
}

interface SelectorProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectorOption[];
    required?: boolean;
    labelClassName?: string;
    selectClassName?: string;
    hideLabel?: boolean;
    filterType?: boolean;
}

const Selector: React.FC<SelectorProps> = ({
    label,
    value,
    onChange,
    options,
    required = false,
    labelClassName = '',
    selectClassName = '',
    hideLabel = false,
    filterType = false
}) => {
    return (
        <>
            {label && (
                <label 
                    className={hideLabel ? 
                        'sr-only' : filterType ? 
                        `text-sm font-medium text-gray-700 ${labelClassName}`
                        : `text-lg font-semibold text-gray-800 ${labelClassName}`
                    }
                >
                    {label}
                </label>
            )}
            <select
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className={filterType ? 
                    `p-1 border rounded ${selectClassName}`
                    : `p-2 border rounded ${selectClassName}`
                }
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.text}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Selector;
