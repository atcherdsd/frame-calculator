import { z } from 'zod';

export const baseDataSchema = z.object({
    type: z.enum(['pipe', 'list', 'fix']),
    name: z.string(),
    unit: z.string(),
    price: z.number(),
});

export const dataPipeSchema = baseDataSchema.extend({
    type: z.literal('pipe'),
    width: z.number(),
});

export const dataListSchema = baseDataSchema.extend({
    type: z.literal('list'),
    width: z.number(),
    material: z.string(),
});

export const dataFixSchema = baseDataSchema.extend({
    type: z.literal('fix'),
});

export const dataSchema = z.array(
    z.union([dataPipeSchema, dataListSchema, dataFixSchema])
);

export type BaseData = z.infer<typeof baseDataSchema>;

export type DataPipe = z.infer<typeof dataPipeSchema>;
export type DataList = z.infer<typeof dataListSchema>;
export type DataFix = z.infer<typeof dataFixSchema>;
export type DataItem = DataList | DataPipe | DataFix;
