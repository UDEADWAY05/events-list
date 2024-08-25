import { trpc } from "@/shared/api"
import { FC } from "react";

type LeaveEventButtonProps = {
    eventId: number;
    onSuccess: () => void;
}

export const LeaveEventButton: FC<LeaveEventButtonProps> = ({ eventId, onSuccess }) => {

    const { mutate } = trpc.event.leave.useMutation({
        onSuccess
    })

    const handleClick = () => {
        console.log("Joined to ", eventId)
        mutate({ id: eventId })
    };

    return (
        <button onClick={handleClick} className="h-10 flex items-center justify-center px-6 font-semibold rounded-md bg-red-500 text-white" type="submit">
            Покинуть
        </button>
    )
}