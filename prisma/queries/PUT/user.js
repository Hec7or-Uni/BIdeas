import prisma from "../../../libs/prisma"

export async function updateUser(id, data) {
  const query = await prisma.users.update({
    data: data,
    where: { id: id },
  })
  return query
}
