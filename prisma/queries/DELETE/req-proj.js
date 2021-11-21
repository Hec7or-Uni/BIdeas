import prisma from "../../../libs/prisma"

export async function deleteReqProject(id) {
  return await prisma.requestJoin.delete({
    where: { id: Number(id) },
  })
}
