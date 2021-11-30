import prisma from "../../../libs/prisma"

export async function deleteUserTeam(id) {
  const query = await prisma.participates.delete({
    where: { id: Number(id) },
  })
  return query
}
