import { z } from "zod";

const schema = z.object({
    color: z.string().max(100).min(1),
    default: z.boolean(),
    name: z.string().max(100).min(1),
});

export default schema;