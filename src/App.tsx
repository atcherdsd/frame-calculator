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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 md:p-6 p-3">
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 animate-fade-in">
                <div className="w-full xl:w-1/2">
                    <CalculatorForm onCalculate={handleCalculation} />
                </div>
                <div className="w-full xl:w-1/2">
                    {results && (
                        <div className="flex flex-col gap-4 overflow-auto bg-white rounded-lg shadow-lg p-6 animate-slide-up">
                            <ResultsTable results={results} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
