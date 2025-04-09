export interface ResultsType {
    area: number;
    realCellSizeX: number;
    realCellSizeY: number;
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

export type SortType = 'price' | 'width';

export type SortDirectionType = 'asc' | 'desc';
