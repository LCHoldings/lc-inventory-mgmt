import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
   id: z.string().max(100).min(1),
   name: z.string().max(100).min(1),
   locationId: z.string().max(100).min(1),
   purchaseCost: z.string().max(100).min(1),
   purchaseDate: z.string().max(100).min(1),
   supplierId: z.string().max(100).min(1),
   purchaseOrderId: z.string().max(100).min(1),
   serialNumber: z.string().max(100).min(1),
   modelId: z.string().max(100).min(1),
   image: z.string().max(100).min(1),
   byod: z.boolean(),
   notes: z.string().max(1000).min(1),
   available: z.boolean(),
   manufacturerId: z.string().max(100).min(1),
   categoryId: z.string().max(100).min(1),

});
export default schema;