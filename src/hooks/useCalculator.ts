import { useState } from 'react';
import { ResultsType } from '../types/calc';
import { ConfigSize, ConfigFrame, BaseConfig, ConfigFix } from '../schemas/configSchema';
import { DataList, DataPipe, DataFix } from '../schemas/dataSchema';
import { 
    calculateFrameParams, 
    calculateScrewParams, 
    calculateSheetParams, 
    getFixingConfig, 
    getFixingData, 
    getMaterialData, 
    getPipeData 
} from '../utils/calcHelpers';

type Params = {
    material: string;
    pipe: string;
    strength: string;
    width: number;
    length: number;
    config: (ConfigSize | ConfigFrame | BaseConfig | ConfigFix )[];
    data: (DataList | DataPipe | DataFix)[];
    onSuccess?: (results: ResultsType) => void;
};

export const useCalculator = () => {
    const [error, setError] = useState<string | null>(null);
    const [widthConfig, setWidthConfig] = useState<ConfigSize | null>(null);
    const [lengthConfig, setLengthConfig] = useState<ConfigSize | null>(null);

    const calculate = ({
        material,
        pipe,
        strength,
        width,
        length,
        config,
        data,
        onSuccess
    }: Params) => {
        const inputValidation = validateInputs(material, pipe, strength, width, length, config, setError);
        if (!inputValidation) return;

        const { widthConfig, lengthConfig, frameConfig } = inputValidation;
        const area = width * length;

        setWidthConfig(widthConfig);
        setLengthConfig(lengthConfig);

        const pipeData = getPipeData(pipe, data);

        const frameParams = calculateFrameParams(width, length, frameConfig, pipeData);

        const materialData = getMaterialData(material, data);

        const sheetParams = calculateSheetParams(area, materialData);

        const fixConfig = getFixingConfig(materialData.material, config, setError);
        if (!fixConfig) return;
        const fixData = getFixingData(data, setError);
        if (!fixData) return;

        const screwParams = calculateScrewParams(area, fixConfig, fixData);

        const totalCost = frameParams.pipeCost + sheetParams.sheetCost + screwParams.screwCost;
    
        const results: ResultsType = {
            area,
            realCellSizeX: frameParams.realCellSizeX,
            realCellSizeY: frameParams.realCellSizeY,
            totalPipeLength: frameParams.totalPipeLength,
            pipeCost: frameParams.pipeCost,
            sheetsNeeded: sheetParams.sheetsNeeded,
            sheetCost: sheetParams.sheetCost,
            screwsNeeded: screwParams.screwsNeeded,
            screwCost: screwParams.screwCost,
            totalCost,
            material,
            pipe,
        };
    
        setError(null);
        onSuccess?.(results);
    };
    
    return {  calculate, error, widthConfig, lengthConfig };
}

function validateInputs(
    material: string,
    pipe: string,
    strength: string,
    width: number,
    length: number,
    config: (ConfigSize | ConfigFrame | BaseConfig)[],
    setError: (msg: string) => void
): { widthConfig: ConfigSize; lengthConfig: ConfigSize; frameConfig: ConfigFrame;} | undefined {
    if (!material) {
        setError('Пожалуйста, выберите материал');
        return;
    }
  
    if (!pipe) {
        setError('Пожалуйста, выберите трубу');
        return;
    }
  
    if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
        setError('Введите положительные числовые значения для размеров');
        return;
    }
  
    const widthConfig = config.find(c => c.key === 'width') as ConfigSize | undefined;
    const lengthConfig = config.find(c => c.key === 'length') as ConfigSize | undefined;
    if (!widthConfig || !lengthConfig) {
        setError('Конфигурация размеров не найдена');
        return;
    }
  
    if (width < widthConfig.min || width > widthConfig.max ||
        length < lengthConfig.min || length > lengthConfig.max
    ) {
        setError(
            `Размеры должны быть в пределах: ширина от ${widthConfig.min} до ${widthConfig.max}\u00A0м, длина от ${lengthConfig.min} до ${lengthConfig.max}\u00A0м`
        );
        return;
    }

    const frameConfig = config.find(
        item => item.key === strength && item.type === 'frame'
    ) as ConfigFrame | undefined;
    if (!frameConfig) {
        setError('Конфигурация прочности не найдена');
        return;
    }
  
    return { widthConfig, lengthConfig, frameConfig };
}
