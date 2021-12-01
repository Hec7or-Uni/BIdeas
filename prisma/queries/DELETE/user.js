import prisma from "../../../libs/prisma"

export async function deleteUser(id) {
  const query = await prisma.users.delete({
    where: { id: Number(id) },
  })
  return query
}