import prismadb from "@/database/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = await req.json();
        if (!name) {
            return new NextResponse("Name is required or not changed", {
                status: 400,
            });
        }

        const updatedStore = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(updatedStore), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store not found", { status: 401 });
        }

        await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId,
            },
        });
        return new NextResponse("store deleted successfully", { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
