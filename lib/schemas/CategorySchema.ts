import { z } from "zod";

const schema = z.object({
    type: z.enum(["device", "item"]),
    name: z.string().max(100).min(1),
});

export default schema;