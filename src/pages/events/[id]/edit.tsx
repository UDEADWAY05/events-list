import { EditEventForm } from "@/features/edit-event";
import { CreateEventSchema, trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Edit() {
    const router = useRouter()

    const session = useSession();

    const { data, isLoading } = trpc.event.findUnique.useQuery({
        id: Number(router.query.id)
    });
    const { mutate } = trpc.event.change.useMutation({
        onSuccess: (data) => {
            router.push(`/events/${data.id}`)
        }
    })

    if (isLoading) {
        return "Loading..."
    }

    if (session.status === 'unauthenticated' || session.data?.user.id !== data?.authorId) {
        return "Forbidden"
    }

    if (!data) {
        return "No data"
    }

    const handleSubmit = (newData: CreateEventSchema) => {
        mutate({ ...newData, id: Number(router.query.id) })
    }

    return (
        <div className="bg-white mt-10 max-w-4xl mx-auto p-5 rounded-xl">
            <EditEventForm onSubmit={handleSubmit} title={data.title} description={data.description} data={data.data} />
        </div>
    );
}