import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import { StoreSwitcher } from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/database/db";

export default async function Navbar() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="" />
                <div className="ml-auto flex items-center space-x-4">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}
