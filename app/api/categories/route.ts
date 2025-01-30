
import { NextResponse } from "next/server";
import db from "@/db";
import { Category as categoryTable} from "@/db/schema";
import { Model as ModelsTable } from "@/db/schema";
//import { checkPermission } from "@/lib/utils";

export const GET = async function GET() {
    try {
        const categories = await db.query.Model.findMany(
            {
                with: {
                    category: true,
                    Manufacturer: {
                        with: {
                            models: {
                                with: {
                                    Manufacturer: true,
                                }
                            },
                            devices: true,
                            items: true,
                    }

                }
            }
            }
        )
        return NextResponse.json(categories);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

// export const POST = auth(async function POST(req) {
//     if (!req.auth) {
//         return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//     }

//     if (!checkPermission(req.auth.user.email || "", "editor", true)) {
//         return NextResponse.json({ message: "Not authorized" }, { status: 403 });
//     }

//     try {
//         const { name, type } = await req.json();
//         const data = {
//             id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
//             name,
//             type,
//         };

//         return NextResponse.json(await prisma.category.create({ data }));
//     } catch {
//         return NextResponse.json(
//             { error: "Failed to create category" },
//             { status: 500 }
//         );
//     }
// });

// export const DELETE = auth(async function DELETE(req) {
//     if (!req.auth) {
//         return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//     }

//     if (!checkPermission(req.auth.user.email || "", "editor", true)) {
//         return NextResponse.json({ message: "Not authorized" }, { status: 403 });
//     }

//     try {
//         const { categoryid } = await req.json();
//         await prisma.category.delete({ where: { id: categoryid } });
//         return NextResponse.json({ success: true });
//     } catch {
//         return NextResponse.json(
//             { error: "Failed to delete category" },
//             { status: 500 }
//         );
//     }
// });
