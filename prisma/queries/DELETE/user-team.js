import prisma from "../../../libs/prisma"

export async function deleteUserTeam(id) {
  return await prisma.participates.delete({
    where: { id: Number(id) },
  })
}
