import rawConfig from '../data/config.json';
import rawData from '../data/data.json';
import { ConfigItem, configSchema } from '../schemas/configSchema';
import { DataItem, dataSchema } from '../schemas/dataSchema';

export function loadData(): DataItem[] {
    const result = dataSchema.safeParse(rawData);
    if (!result.success) {
        console.error(result.error.format());
        throw new Error('Ошибка валидации data.json');
    }
    return result.data;
};
  
export function loadConfig(): ConfigItem[] {
    const result = configSchema.safeParse(rawConfig);
    if (!result.success) {
        console.error(result.error.format());
        throw new Error('Ошибка валидации config.json');
    }
    return result.data;
};
