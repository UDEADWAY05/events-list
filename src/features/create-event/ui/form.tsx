import { FC } from "react";
import { useForm } from "react-hook-form";
import { CreateEventSchema } from "@/shared/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type CreateEventFormValues = z.infer<typeof CreateEventSchema>

type CreateEventFormProps = {
    onSubmit: (data: CreateEventFormValues) => void;
}

export const CreateEventForm: FC<CreateEventFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateEventFormValues>({
        resolver: zodResolver(CreateEventSchema)
    })


    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Событие</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Заполните форму для создания события
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Название
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                type="text"
                                placeholder="Заголовок"
                                autoComplete="title"
                                className="flex-1 border-0 bg-transparent px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md outline-none py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                {...register("title")}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-red-500">{errors.title?.message}</p>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Описание
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                rows={3}
                                autoComplete="description"
                                className="block outline-none w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                {...register("description")}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Напишите несколько предложений о предстоящем мероприятии</p>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Дата проведения
                        </label>
                        <div className="mt-2">
                            <input
                                id="date"
                                type="date"
                                className="block rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                {...register("data")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
            </button>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        </div>
    </form>
    )
};