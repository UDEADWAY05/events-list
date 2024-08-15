import Image from "next/image";
import Link from "next/link";
import comp from "@/assets/img/comp.jpg"

type EventCardProps = {
    id: number;
    title: string;
    description: string | null;
    data: Date;
}

export const EventCard = ({ id, title, description, data }: EventCardProps) => {
    return (
        <div className="flex  font-sans w-full rounded-md max-w-[600px] bg-white">
            <div className="flex-none w-40 relative rounded-s-md">
                <Image
                    src={comp}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-s-md"
                    loading="lazy"
                    fill
                />
            </div>
            <div className="flex-auto relative p-6">
                <div className="flex-wrap">
                    <h1 className="flex-auto text-lg font-semibold text-slate-900">
                        {title}
                    </h1>
                    <div className="text-lg absolute top-4 right-4 font-semibold text-slate-500">
                        {data.toDateString()}
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                        {description}
                    </div>
                </div>
                <div className="flex space-x-4 mt-6 text-sm font-medium">
                    <div className="flex-auto flex space-x-4">
                        <Link href={`/events/${id}`} className="h-10 flex items-center justify-center px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Присоединится
                        </Link>
                        <Link href={`/events/${id}`} className="h-10 flex items-center justify-center px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}