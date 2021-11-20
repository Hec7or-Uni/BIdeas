import prisma from "../../../libs/prisma"

export async function createReqUser(data) {
  return await prisma.requestRecruit.create({ data: data })
}
