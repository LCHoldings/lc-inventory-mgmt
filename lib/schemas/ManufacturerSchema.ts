import { z } from "zod";

const schema = z.object({
    siteUrl: z.string().url().min(1),
    supportUrl: z.string().url().min(1),
    supportPhone: z.string().max(20).min(1),
    supportEmail: z.string().email().min(1),
    name: z.string().max(100).min(1),
    image: z.string().url().min(1),
});

export default schema;