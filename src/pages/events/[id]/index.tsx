import { EventDetail } from "@/entities/event";
import { trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Event() {
    const router = useRouter();
    const session = useSession();

    const { data, isLoading } = trpc.event.findUnique.useQuery({
        id: Number(router.query.id)
    });

    if (isLoading) {
        return "Loading..."
    }

    if (session.status === 'unauthenticated') {
        return "Forbidden"
    }

    if (!data) {
        return "No data"
    }

    return <div className="bg-white mt-10 max-w-4xl mx-auto p-5 rounded-md">
        <EventDetail
            {...data}
            action={data.authorId === session.data?.user.id && <Link className="px-2 py-1.5 bg-blue-500 rounded-md" href={`${router.query.id}/edit`}>Редактировать событие</Link>}
        />
    </div >
}