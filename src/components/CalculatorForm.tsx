import React, { FormEvent, useState } from 'react';
import Button from '../components/ui/Button';
import { ResultsType, SortDirectionType, SortType } from '../types/calc';
import { useCalculator } from '../hooks/useCalculator';
import { loadConfig, loadData } from '../utils/loadData';
import { ConfigItem } from '../schemas/configSchema';
import { DataItem } from '../schemas/dataSchema';
import MaterialSelector from './MaterialSelector';
import Selector, { SelectorOption } from './ui/Selector';
import Input from './ui/Input';

const config: ConfigItem[] = loadConfig();
const data: DataItem[] = loadData();
interface CalculatorFormProps {
    onCalculate: (results: ResultsType | null) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
    const [material, setMaterial] = useState<string>('');
    const [pipe, setPipe] = useState<string>('');
    const [strength, setStrength] = useState<string>('standard');
    const [width, setWidth] = useState<number>(10);
    const [length, setLength] = useState<number>(10);

    const [materialFilter, setMaterialFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortType>('price');
    const [sortDirection, setSortDirection] = useState<SortDirectionType>('asc');

    const { calculate, error, widthConfig, lengthConfig } = useCalculator();

    const handleCalculate = (e: FormEvent) => {
        e.preventDefault();

        calculate({
            material,
            pipe,
            strength,
            width,
            length,
            config,
            data,
            onSuccess: onCalculate
        })
    };

    const allMaterials = data.filter(item => item.type === 'list');

    const filteredMaterials = materialFilter === 'all'
        ? allMaterials
        : allMaterials.filter(item => item.material === materialFilter);

    const sortedMaterials = filteredMaterials.sort((a, b) => {
        const key = sortBy;
        const aValue = a[key];
        const bValue = b[key];
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const materialSelectorProps = { 
        materialFilter, 
        setMaterialFilter, 
        allMaterials,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        material,
        setMaterial,
        sortedMaterials
    };

    const pipeSelectOptions: SelectorOption[] = [
        { value: '', text: 'Выберите трубу' },
        ...data.filter(item => item.type === 'pipe').map(item => ({
            value: item.name,
            text: item.name
        }))
    ];
    const strengthSelectOptions: SelectorOption[] = [
        ...config.filter(item => item.type === 'frame').map(item => ({
            value: item.key,
            text: item.name
        }))
    ];

    return (
        <form 
            onSubmit={handleCalculate} 
            noValidate 
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-3 min-w-[300px] animate-slide-up"
        >
            <h1 className="text-2xl font-bold pb-4 text-blue-700">Калькулятор расчета каркаса</h1>

            <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-gray-800">Материал покрытия:</h2>
                <MaterialSelector {...materialSelectorProps} />
            </div>

            <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-3">
                <Selector 
                    label="Труба каркаса:"
                    value={pipe}
                    onChange={setPipe}
                    required
                    options={pipeSelectOptions}
                />
            </div>

            <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-3">
                <Selector 
                    label="Прочность каркаса:"
                    value={strength}
                    onChange={setStrength}
                    required
                    options={strengthSelectOptions}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
                <Input 
                    label="Ширина изделия&nbsp;(м):"
                    value={width}
                    onChange={setWidth}
                    min={widthConfig?.min}
                    max={widthConfig?.max}
                    required
                />
                <Input
                    label="Длина изделия&nbsp;(м):"
                    value={length}
                    onChange={setLength}
                    min={lengthConfig?.min}
                    max={lengthConfig?.max}
                    required
                />
            </div>
            {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white">Рассчитать</Button>
        </form>
    );
};

export default CalculatorForm;
