import prisma from "../../../libs/prisma"

export async function deleteReqUser(id) {
  const query = await prisma.requestRecruit.delete({
    where: { id: Number(id) },
  })
  return query
}
