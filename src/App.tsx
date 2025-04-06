import React, { useState } from 'react';
import CalculatorForm from '../src/components/CalculatorForm';
import './index.css';
import './App.css';
import ResultsTable from './components/ResultTable';
import { ResultsType } from './types/calc';

const App: React.FC = () => {
    const [results, setResults] = useState<ResultsType | null>(null);

    const handleCalculation = (data: ResultsType | null) => {
        setResults(data);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between p-4 gap-4">
            <div className="w-full md:w-1/2">
                <CalculatorForm onCalculate={handleCalculation} />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2 mt-6 md:mt-0">
                {results && (
                    <ResultsTable results={results} />
                )}
            </div>
        </div>
    );
};

export default App;
