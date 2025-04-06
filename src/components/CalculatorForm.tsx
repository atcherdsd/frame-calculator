import React, { FormEvent, useState } from 'react';
import Button from '../components/ui/Button';
import { ResultsType } from '../types/calc';
import { useCalculator } from '../hooks/useCalculator';
import { loadConfig, loadData } from '../utils/loadData';
import { ConfigItem } from '../schemas/configSchema';
import { DataItem } from '../schemas/dataSchema';

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

    return (
        <form onSubmit={handleCalculate} noValidate className="flex flex-col gap-3 min-w-[300px]">
            <h2 className="text-xl font-bold pb-6">Калькулятор</h2>
            <label>Материал:</label>
            <select value={material} required onChange={(e) => setMaterial(e.target.value)} className="p-2 border rounded">
                <option value="">Выберите материал</option>
                {data.filter(item => item.type === 'list').map(item => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>

            <label>Труба:</label>
            <select value={pipe} required onChange={(e) => setPipe(e.target.value)} className="p-2 border rounded">
                <option value="">Выберите трубу</option>
                {data.filter(item => item.type === 'pipe').map(item => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>

            <label>Прочность:</label>
                <select value={strength} onChange={(e) => setStrength(e.target.value)} className="p-2 border rounded">
                {config.filter(item => item.type === 'frame').map(item => (
                    <option key={item.key} value={item.key}>{item.name}</option>
                ))}
            </select>

            <label>Ширина изделия (м):</label>
            <input 
                type="number" 
                step="0.01" 
                min={widthConfig?.min}
                max={widthConfig?.max}
                value={width} 
                required
                onChange={(e) => setWidth(+e.target.value)} 
                className="p-2 border rounded" 
            />

            <label>Длина изделия (м):</label>
            <input 
                type="number" 
                step="0.01" 
                min={lengthConfig?.min}
                max={lengthConfig?.max} 
                value={length} 
                required
                onChange={(e) => setLength(+e.target.value)} 
                className="p-2 border rounded" 
            />

            {error && <div className="text-red-500 mt-2">{error}</div>}
            <Button className="mt-4 bg-blue-500 text-white">Рассчитать</Button>
        </form>
    );
};

export default CalculatorForm;
