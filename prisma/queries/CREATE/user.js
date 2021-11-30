import prisma from "../../../libs/prisma"

export async function createUser(data) {
  const query = await prisma.users.create({ data: data })
  return query
}
