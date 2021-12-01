import prisma from "../../../libs/prisma"

export async function deleteTeam(id) {
  const query = await prisma.projects.delete({
    where: { id: Number(id) },
  })
  return query
}
