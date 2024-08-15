import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

const main = async () => {
    const user = await db.user.create({
        data: {
            name: "Пользователь",
            email: "email@email.com",
            password: "123456",
        },
        select: {
            
        }
    })

    console.log(user)
}

main()