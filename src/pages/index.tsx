import { Inter } from "next/font/google";
import { prisma } from "@/server/db";
import { trpc } from "@/shared/api";
import { EventCard } from "@/entities/event";
import { JoinEventButton } from "@/features/join-event";
import { LeaveEventButton } from "@/features/leave-event";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { data, refetch } = trpc.event.findMany.useQuery();
    const session = useSession()


    return <ul className="max-w-[1280px] flex flex-col  items-center justify-center mt-6 mx-auto">
        {
            data?.map((event) => {
                return <li key={event.id}>
                    <EventCard {...event}
                        action={
                            session.data?.user && (
                                !event.isJoinded
                                    ? <JoinEventButton eventId={event.id} onSuccess={refetch} />
                                    : <LeaveEventButton eventId={event.id} onSuccess={refetch} />
                            )
                        } />
                </li>
            })
        }
    </ul>
}