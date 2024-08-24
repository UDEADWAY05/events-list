import { EventDetail } from "@/entities/event";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function Event() {
    const router = useRouter();
    const { data, isLoading } = trpc.event.findUnique.useQuery({
        id: Number(router.query.id)
    });

    if (isLoading) {
        return "Loading..."
    }

    if (!data) {
        return "No data"
    }

    return <div className="bg-white mt-10 max-w-4xl mx-auto p-5 rounded-xl">
        <EventDetail {...data} />
    </div>
}