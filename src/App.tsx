import React, { useState } from 'react';
import CalculatorForm from '../src/components/CalculatorForm';
import './index.css';

const App: React.FC = () => {
    const [, setResults] = useState<object | null>(null);

    const handleCalculation = (data: object | null) => {
        setResults(data);
    };

    return (
        <div className="flex p-4 gap-4">
            <CalculatorForm onCalculate={handleCalculation} />
        </div>
    );
};

export default App;
