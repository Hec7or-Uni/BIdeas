import prisma from "../../../libs/prisma"

export async function createReqProject(data) {
  const query = await prisma.requestJoin.create({ data: data })
  return query
}
