import { z } from "zod";

const schema = z.object({
    name: z.string().max(100).min(1),
    image:z.string().url(),
    modelNumber: z.string().max(100).min(1),
    manufacturerId: z.string().uuid().min(1),
    categoryId: z.string().uuid().min(1),
});


export default schema;