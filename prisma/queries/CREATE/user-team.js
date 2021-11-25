import prisma from "../../../libs/prisma"

export async function createUserTeam(idUser, idProject) {
  return await prisma.participates.create({
    data: {
      idUser: Number(idUser),
      idProject: Number(idProject),
    },
  })
}
