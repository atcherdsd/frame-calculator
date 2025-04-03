import React, { useState } from 'react';
import Button from '../components/ui/Button';
import config from '../data/config.json';
import data from '../data/data.json';
import { ResultsType } from '../App';

interface CalculatorFormProps {
    onCalculate: (results: ResultsType | null) => void;
}

type ConfigType = {
    type: string;
    key: string;
    name: string;
}
type ConfigSizeType = ConfigType & {
    min: number;
    max: number;
    step: number;
}
type ConfigFrameType = ConfigType & {
    step: number;
}
type ConfigFixType = ConfigType & {
    value: number;
}

type DataType = {
    type: string;
    name: string;
    unit: string;
    price: number;
}
type DataPipeType = DataType & { 
    width: number; 
}
type DataListType = DataPipeType & { 
    material: string;
}
type DataFixType = DataType

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
    const [material, setMaterial] = useState<string>('');
    const [pipe, setPipe] = useState<string>('');
    const [strength, setStrength] = useState<string>('standard');
    const [width, setWidth] = useState<number>(10);
    const [length, setLength] = useState<number>(10);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = () => {
        try {
            const widthNum = width;
            const lengthNum = length;
      
            if (isNaN(widthNum) || isNaN(lengthNum) || widthNum <= 0 || lengthNum <= 0) {
                setError('Введите положительные числовые значения для размеров.');
                return;
            }
            if (
                widthNum < (config[1] as ConfigSizeType).min || 
                widthNum > (config[1] as ConfigSizeType).max || 
                lengthNum < (config[0] as ConfigSizeType).min || 
                lengthNum > (config[0] as ConfigSizeType).max
            ) {
                setError(`Размеры должны быть в пределах: ширина от ${config[1].min} до ${config[1].max} м, длина от ${config[0].min} до ${config[0].max} м.`);
                return;
            }
      
            const area = widthNum * lengthNum;
            const frameConfig = config.find(item => item.key === strength && item.type === 'frame') as ConfigFrameType;
            const step = frameConfig.step;

            const pipeData = data.find(item => item.name === pipe && item.type === 'pipe') as DataPipeType;
      
            if (!pipeData) {
                setError('Выберите трубу.');
                return;
            }
      
            const pipeWidthM = pipeData.width / 1000;
            const pipePrice = pipeData.price;
            const cellSizeX = Math.min(step, widthNum - pipeWidthM);
            const cellSizeY = Math.min(step, lengthNum - pipeWidthM);
            const pipesX = Math.ceil(widthNum / cellSizeX) + 1;
            const pipesY = Math.ceil(lengthNum / cellSizeY) + 1;
            const totalPipeLength = (pipesX * lengthNum + pipesY * widthNum) + (pipesX * pipeWidthM + pipesY * pipeWidthM);
            const pipeCost = totalPipeLength * pipePrice;
      
            const materialData = data.find(item => item.name === material && item.type === 'list') as DataListType;
            if (!materialData) {
                setError('Выберите материал.');
                return;
            }
      
            const sheetsNeeded = Math.ceil(area / (1 * materialData.width));
            const sheetPrice = materialData.price;
            const sheetCost = sheetsNeeded * sheetPrice;
            
            const fixConfig = config.find(item => item.type === 'fix') as ConfigFixType;
            const screwsNeeded = Math.ceil(area * fixConfig.value);

            const fixData = data.find(item => item.type === 'fix') as DataFixType;
            const screwPrice = fixData.price;
            const screwCost = screwsNeeded * screwPrice;
            const totalCost = pipeCost + sheetCost + screwCost;
      
            const results = {
                area,
                cellSizeX,
                cellSizeY,
                sheetsNeeded,
                totalPipeLength,
                screwsNeeded,
                sheetCost,
                pipeCost,
                screwCost,
                totalCost,
                material,
                pipe
            };
      
            setError(null);
            onCalculate(results);
        } catch (e) {
            setError('Ошибка расчета. Проверьте введенные данные.');
            console.warn(`Ошибка: ${e}`);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold pb-4">Калькулятор</h2>
            <div className="flex flex-col gap-2 min-w-[570px]">
                <label>Материал:</label>
                <select value={material} onChange={(e) => setMaterial(e.target.value)} className="p-2 border rounded">
                    <option value="">Выберите материал</option>
                    {data.filter(item => item.type === 'list').map(item => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>

                <label>Труба:</label>
                <select value={pipe} onChange={(e) => setPipe(e.target.value)} className="p-2 border rounded">
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
                <input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} className="p-2 border rounded" />

                <label>Длина изделия (м):</label>
                <input type="number" value={length} onChange={(e) => setLength(+e.target.value)} className="p-2 border rounded" />

                {error && <div className="text-red-500 mt-2">{error}</div>}
                <Button onClick={handleCalculate} className="mt-4 bg-blue-500 text-white">Рассчитать</Button>
            </div>
        </div>
    );
};

export default CalculatorForm;
