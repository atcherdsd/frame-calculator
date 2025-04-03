import React, { useState } from 'react';
import CalculatorForm from '../src/components/CalculatorForm';
import './index.css';

export type ResultsType = {
    area: number;
    cellSizeX: number;
    cellSizeY: number;
    totalCost: number;
}

const App: React.FC = () => {
    const [results, setResults] = useState<ResultsType | null>(null);

    const handleCalculation = (data: ResultsType | null) => {
        setResults(data);
    };

    return (
        <div className="flex p-4 gap-4">
            <CalculatorForm onCalculate={handleCalculation} />
            {results && (
                <div>
                    <h2 className="text-xl font-bold">Итоги расчета</h2>
                    <div>Площадь изделия: {results.area.toFixed(2)} м²</div>
                    <div>Размер ячейки: {results.cellSizeX.toFixed(2)} x {results.cellSizeY.toFixed(2)} м</div>
                    <div>Итоговая стоимость: {results.totalCost.toFixed(2)}</div>
                </div>
            )}
        </div>
    );
};

export default App;
