import { z } from "zod";

const schema = z.object({
    name: z.string().max(100).min(1),
    statusId: z.string().uuid().min(1),
    currentUserId: z.string().max(100).min(1),
    locationId: z.string().uuid().min(1),
    purchaseCost: z.string().max(100).min(1),
    purchaseDate: z.string().max(100).min(1),
    supplierId: z.string().uuid().min(1),
    purchaseOrderId: z.string().max(100).min(1),
    serialNumber: z.string().max(100).min(1),
    modelId: z.string().uuid().min(1),
    image: z.string().url().min(1),
    byod: z.boolean(),
    notes: z.string().max(1000).min(1),
    available: z.boolean(),
    manufacturerId: z.string().uuid().min(1),
    categoryId: z.string().uuid().min(1),
 });
export default schema;