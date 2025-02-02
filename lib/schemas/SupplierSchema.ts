import { PhoneNumber } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
    name: z.string().max(100).min(1),
    website: z.string().max(100).min(1),
    phoneNumber: z.string().max(20).min(1),
    contactPerson: z.string().max(100).min(1),
    postAdress: z.string().max(100).min(1),
    emailAdress: z.string().max(100).min(1),

});

export default schema;