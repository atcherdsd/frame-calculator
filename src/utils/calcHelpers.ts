import { ConfigFrame, BaseConfig, ConfigFix } from '../schemas/configSchema';
import { DataList, DataPipe, DataFix } from '../schemas/dataSchema';

export function getPipeData(
    pipeName: string, 
    data: (DataPipe | DataList | DataFix)[]
) {
    const pipe = data.find(
        item => item.name === pipeName && item.type === 'pipe'
    ) as DataPipe;

    return pipe;
}

export function calculateFrameParams(
    width: number, 
    length: number, 
    frameConfig: ConfigFrame, 
    pipe: DataPipe
) {
    const maxStep = frameConfig.step;
    const pipeWidthM = pipe.width / 1000;

    const pipesX = Math.ceil(width / maxStep) + 1;
    const pipesY = Math.ceil(length / maxStep) + 1;

    const realCellSizeX = (width - pipesX * pipeWidthM) / (pipesX - 1);
    const realCellSizeY = (length - pipesY * pipeWidthM) / (pipesY - 1);

    const totalPipeLength = pipesX * length + pipesY * width;
    const pipeCost = totalPipeLength * pipe.price;

    return {
        realCellSizeX,
        realCellSizeY,
        totalPipeLength,
        pipeCost
    };
}

export function getMaterialData(
    materialName: string, 
    data: (DataList | DataPipe | DataFix)[]
) {
    const material = data.find(
        item => item.name === materialName && item.type === 'list'
    ) as DataList;

    return material;
}

export function calculateSheetParams(area: number, material: DataList) {
    const sheetsNeeded = Math.ceil(area / (1 * material.width));
    const sheetCost = sheetsNeeded * material.price;
    return { sheetsNeeded, sheetCost };
}

export function getFixingConfig(
    materialKey: string, 
    config: (ConfigFix | BaseConfig)[],
    setError: (msg: string) => void
) {
    const fixConfig = config.find(
        item => item.type === 'fix' && item.key === materialKey
    ) as ConfigFix | undefined;

    if (!fixConfig) {
        setError('Конфигурация крепежа не найдена');
        return;
    }
    return fixConfig;
}

export function getFixingData(data: (DataFix | DataList | DataPipe)[], setError: (msg: string) => void) {
    const fixData = data.find(item => item.type === 'fix') as DataFix | undefined;
    if (!fixData) {
        setError('Цена крепежа не найдена');
        return;
    }
    return fixData;
}

export function calculateScrewParams(area: number, fixConfig: ConfigFix, fixData: DataFix) {
    const screwsNeeded = Math.ceil(area * fixConfig.value);
    const screwCost = screwsNeeded * fixData.price;
    return { screwsNeeded, screwCost };
}
