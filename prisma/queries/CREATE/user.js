import prisma from "../../../libs/prisma"

export async function createUser(data) {
  return await prisma.users.create({ data: data })
}
