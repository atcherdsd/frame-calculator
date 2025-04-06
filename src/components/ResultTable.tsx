import React from 'react';
import { ResultsType } from '../types/calc';

interface ResultsTableProps {
    results: ResultsType;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    return (
        <>
            <h2 className="text-xl font-bold">Итоги расчета</h2>
            <div>Площадь изделия: {results.area.toFixed(2)} м²</div>
            <div>Размер ячейки: {results.realCellSizeX.toFixed(2)} x {results.realCellSizeY.toFixed(2)} м</div>
            <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Наименование</th>
                        <th className="border px-4 py-2">ед.</th>
                        <th className="border px-4 py-2">кол-во</th>
                        <th className="border px-4 py-2">сумма (руб.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">{results.material}</td>
                        <td className="border px-4 py-2">м²</td>
                        <td className="border px-4 py-2">{results.sheetsNeeded}</td>
                        <td className="border px-4 py-2">{results.sheetCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{results.pipe}</td>
                        <td className="border px-4 py-2">мп</td>
                        <td className="border px-4 py-2">{results.totalPipeLength.toFixed(2)}</td>
                        <td className="border px-4 py-2">{results.pipeCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Саморез</td>
                        <td className="border px-4 py-2">шт</td>
                        <td className="border px-4 py-2">{results.screwsNeeded}</td>
                        <td className="border px-4 py-2">{results.screwCost.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="text-lg font-bold">Итоговая стоимость: {results.totalCost.toFixed(2)} руб.</div>
        </>
    );
};

export default ResultsTable;
