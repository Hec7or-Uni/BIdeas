import prisma from "../../../libs/prisma"

export async function createUserTeam(idUser, idProject) {
  const query = await prisma.participates.create({
    data: {
      idUser: Number(idUser),
      idProject: Number(idProject),
    },
  })
  return query
}
