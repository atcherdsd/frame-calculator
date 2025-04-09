import { DataList } from '../schemas/dataSchema';
import { SortDirectionType, SortType } from '../types/calc';
import { getMaterialType } from '../utils/calcHelpers';
import Selector, { SelectorOption } from './ui/Selector';

interface MaterialSelectorProps {
    materialFilter: string;
    setMaterialFilter: (value: string) => void;
    allMaterials: DataList[];
    sortBy: SortType;
    setSortBy: (value: SortType) => void;
    sortDirection: SortDirectionType;
    setSortDirection: (value: SortDirectionType) => void;
    material: string;
    setMaterial: (value: string) => void;
    sortedMaterials: DataList[];
}

const MaterialSelector = ({ 
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
    }: MaterialSelectorProps) => {
        const filterOptions: SelectorOption[] = [
            { value: 'all', text: 'Все'  },
            ...Array.from(new Set(allMaterials.map(m => m.material))).map(mat => ({
                value: mat,
                text: getMaterialType(mat)
            }))
        ];
        
        const sortOptions: SelectorOption[] = [
            { value: 'price', text: 'Цене' },
            { value: 'width', text: 'Ширине' },
        ];
        
        const directionOptions: SelectorOption[] = [
            { value: 'asc', text: 'По возрастанию' },
            { value: 'desc', text: 'По убыванию' },
        ];

        const selectOptions: SelectorOption[] = [
            {value: '', text: 'Выберите материал' },
            ...sortedMaterials.map((item) => ({
                value: item.name,
                text: `${item.name} / ${item.price} р.`,
            }))
        ];

    return (
        <>
            <div className="flex gap-2 items-center">
                <Selector 
                    label="Тип покрытия:"
                    value={materialFilter}
                    onChange={setMaterialFilter}
                    options={filterOptions}
                    labelClassName="shrink-0"
                    selectClassName="w-full"
                    filterType
                />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <Selector 
                    label="Сортировать по"
                    value={sortBy}
                    onChange={(val) => setSortBy(val as SortType)}
                    options={sortOptions}
                    filterType
                />
                <Selector
                    value={sortDirection}
                    onChange={(val) => setSortDirection(val as SortDirectionType)}
                    options={directionOptions}
                    filterType
                />
            </div>
            <div className="flex flex-col">
                <Selector
                    label="Выберите материал"
                    hideLabel
                    value={material}
                    onChange={setMaterial}
                    required
                    options={selectOptions}
                />
            </div>
        </>
    )
}

export default MaterialSelector;
