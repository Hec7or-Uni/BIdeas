import prisma from "../../../libs/prisma"

export async function createReqUser(data) {
  const query = await prisma.requestRecruit.create({ data: data })
  return query
}
