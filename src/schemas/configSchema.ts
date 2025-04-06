import { z } from 'zod';

export const ConfigTypeEnum = z.enum(['size', 'frame', 'material', 'fix']);
export type ConfigType = z.infer<typeof ConfigTypeEnum>;

export const ConfigKeyEnum = z.enum(['length', 'width', 'light', 'standard', 'strong', 'metal', 'plastic']);
export type ConfigKey = z.infer<typeof ConfigKeyEnum>;

export const baseConfigSchema = z.object({
    type: ConfigTypeEnum,
    key: z.string(),
    name: z.string(),
});

export const configSizeSchema = baseConfigSchema.extend({
    type: z.literal('size'),
    key: z.enum(['length', 'width']),
    min: z.number(),
    max: z.number(),
    step: z.number(),
});

export const configFrameSchema = baseConfigSchema.extend({
    type: z.literal('frame'),
    key: z.string(),
    step: z.number(),
});

export const configFixSchema = baseConfigSchema.extend({
    type: z.literal('fix'),
    key: z.enum(['metal', 'plastic']),
    value: z.number(),
});

export const configSchema = z.array(
    z.union([
        configSizeSchema,
        configFrameSchema,
        configFixSchema,
        baseConfigSchema
    ])
);

export type BaseConfig = z.infer<typeof baseConfigSchema>;
export type ConfigSize = z.infer<typeof configSizeSchema>;
export type ConfigFrame = z.infer<typeof configFrameSchema>;
export type ConfigFix = z.infer<typeof configFixSchema>;
export type ConfigItem = ConfigSize | ConfigFrame | ConfigFix | BaseConfig;
