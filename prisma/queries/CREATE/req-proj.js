import prisma from "../../../libs/prisma"

export async function createReqProject(data) {
  return await prisma.requestJoin.create({ data: data })
}
