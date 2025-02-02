import { z } from "zod";

const schema = z.object({
   name: z.string(),
   statusId: z.string().uuid(),
   currentUserId: z.string(),
   locationId: z.string().uuid(),
   purchaseCost: z.string(),
   purchaseDate: z.date(),
   supplierId: z.string().uuid(),
   purchaseOrderId: z.string(),
   serialNumber: z.string(),
   modelId: z.string().uuid(),
   image: z.string().optional(),
   byod: z.boolean(),
   notes: z.string().optional(),
   available: z.boolean(),
   manufacturerId: z.string().uuid(),
   categoryId: z.string().uuid(),
});
export default schema;