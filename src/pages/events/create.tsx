// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { CreateEventForm, CreateEventFormValues } from "@/features/create-event/ui/form";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";



export default function CreateEvent() {
    const router = useRouter()
    const { mutate } = trpc.event.create.useMutation({
        onSuccess: (data) => {
            router.push(`${data.id}`);
        }
    });

    const handleSubmit = (data: CreateEventFormValues) => {
        mutate(data);
    }

    return (
        <div className="bg-white mt-10 max-w-4xl mx-auto p-5 rounded-xl">
            <CreateEventForm onSubmit={handleSubmit} />
        </div>
    )
};