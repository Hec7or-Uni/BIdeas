import prisma from "../../../libs/prisma"

export async function deleteReqUser(id) {
  return await prisma.requestRecruit.delete({
    where: { id: Number(id) },
  })
}
