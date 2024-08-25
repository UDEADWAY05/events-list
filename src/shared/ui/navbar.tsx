import { useSession } from "next-auth/react";
import Link from "next/link";

export const NavBar = () => {
    const { data } = useSession();


    return (
        <div className="flex bg-white w-full items-center justify-between border-b-[1px] z-10 mt-0 p-4 text-secondary-dark">
            <Link href="/" className=" font-medium text-xl">Result School</Link>
            {
                data?.user
                    ? <div className="flex items-center justify-center gap-2">
                        <p className=" font-normal text-lg text-secondary">{data?.user.name}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>

                        <Link href={"/events/create"} className="bg-green-500 p-2 py-1.5 font-medium text-white rounded-md">
                            Создать событие
                        </Link>
                    </div>
                    : <Link href={"/api/auth/signin"} className="flex items-center text-secondary gap-2">
                        <p>
                            Войти
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
            }
        </div >
    );
}