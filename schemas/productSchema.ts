// lib/schemas/productSchema.ts
import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    sku: z.string().min(1, "La référence SKU est requise"),
    category: z.string().min(1, "La catégorie est requise"),
    price: z.number().positive("Le prix doit être positif"),
    cost: z.number().positive("Le coût doit être positif"),
    stock: z.number().int().nonnegative("Le stock ne peut pas être négatif"),
    minStock: z.number().int().nonnegative("Le stock minimum ne peut pas être négatif"),
    maxStock: z.number().int().optional().nullable(),
    barcode: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    supplier: z.string().optional().nullable(),
    active: z.boolean().default(true),
    images: z.array(z.instanceof(File)).optional().default([]),
})