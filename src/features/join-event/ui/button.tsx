import { trpc } from "@/shared/api"
import { FC } from "react";

type JoinEventButtonProps = {
    eventId: number;
    onSuccess: () => void;
}

export const JoinEventButton: FC<JoinEventButtonProps> = ({ eventId, onSuccess }) => {

    const { mutate } = trpc.event.join.useMutation({
        onSuccess
    })

    const handleClick = () => {
        console.log("Joined to ", eventId)
        mutate({ id: eventId })
    };

    return (
        <button onClick={handleClick} className="h-10 flex items-center justify-center px-6 font-semibold rounded-md bg-black text-white" type="submit">
            Присоединится
        </button>
    )
}