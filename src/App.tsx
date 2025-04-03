import React, { useState } from 'react';
import CalculatorForm from '../src/components/CalculatorForm';
import './index.css';
import './App.css';
import ResultsTable from './components/ResultTable';

export type ResultsType = {
    area: number;
    cellSizeX: number;
    cellSizeY: number;
    sheetsNeeded: number;
    totalPipeLength: number;
    screwsNeeded: number;
    sheetCost: number;
    pipeCost: number;
    screwCost: number;
    totalCost: number;
    material: string;
    pipe: string;
}

const App: React.FC = () => {
    const [results, setResults] = useState<ResultsType | null>(null);

    const handleCalculation = (data: ResultsType | null) => {
        setResults(data);
    };

    return (
        <div className="flex justify-between p-4 gap-4">
            <CalculatorForm onCalculate={handleCalculation} />
            <div className="w-1/2 flex flex-col gap-4">
                {results && (
                    <ResultsTable results={results} />
                )}
            </div>
        </div>
    );
};

export default App;
