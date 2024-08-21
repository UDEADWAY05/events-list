import { Inter } from "next/font/google";
import { prisma } from "@/server/db";
import { trpc } from "@/shared/api";
import { EventCard } from "@/entities/event/ui/card";
import { JoinEventButton } from "@/features/join-event";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { data } = trpc.event.findMany.useQuery();
    console.log(data)
    return <ul className="max-w-[1280px] flex flex-col  items-center justify-center mt-6 mx-auto">
        {
            data?.map((event) => {
                return <li key={event.id}>
                    <EventCard {...event} action={<JoinEventButton eventId={event.id} />} />
                </li>
            })
        }
    </ul>
}