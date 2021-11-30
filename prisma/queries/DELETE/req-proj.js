import prisma from "../../../libs/prisma"

export async function deleteReqProject(id) {
  const query = await prisma.requestJoin.delete({
    where: { id: Number(id) },
  })
  return query
}
