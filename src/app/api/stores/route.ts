import prismadb from "@/database/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = await req.json();
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log("Error in POST /api/stores", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
