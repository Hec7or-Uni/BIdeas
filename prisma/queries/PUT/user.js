import prisma from "../../../libs/prisma"

export async function updateUser(data) {
    const query = await prisma.users.update({
        data: data,
        where: { id: data.id },
      })
    return query
}
