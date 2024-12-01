"use client";

import ApiAlerts from "@/components/ApiAlerts";
import Heading from "@/components/Heading";
import AlertModal from "@/components/modal/AlertModal";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/useOrigin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const origin = useOrigin();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            if (values.name === initialData.name) {
                toast.message("No changes found");
                return;
            }
            await fetch(`/api/stores/${params.storeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            toast.success("Store updated successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onDeleteStore = async () => {
        setLoading(true);
        try {
            await fetch(`/api/stores/${params.storeId}`, {
                method: "DELETE",
            });
            router.refresh();
            router.push("/");
            toast.success("Store deleted successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
                onConfirm={onDeleteStore}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full">
                        <div className="grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={
                                                    form.formState.isSubmitting
                                                }
                                                placeholder="Store name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit">
                            Save changes
                        </Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <ApiAlerts
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
    );
}
