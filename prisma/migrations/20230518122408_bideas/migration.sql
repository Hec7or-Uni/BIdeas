-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(36) NOT NULL,
    "avatar" TEXT,
    "description" VARCHAR(500),
    "xp" INTEGER NOT NULL DEFAULT 0,
    "respect" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(75) NOT NULL,
    "age" INTEGER,
    "genre" INTEGER,
    "country" VARCHAR(50),
    "studies" VARCHAR(50),
    "email" VARCHAR(254) NOT NULL,
    "salt" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "plan" INTEGER NOT NULL DEFAULT 0,
    "av4hire" BOOLEAN NOT NULL DEFAULT true,
    "facebook" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "teamName" VARCHAR(50) NOT NULL,
    "avatar" TEXT,
    "motto" VARCHAR(80),
    "description" VARCHAR(500),
    "xp" INTEGER NOT NULL DEFAULT 0,
    "respect" INTEGER NOT NULL DEFAULT 0,
    "country" VARCHAR(50),
    "maxMembers" INTEGER NOT NULL DEFAULT 4,
    "facebook" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participates" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,

    CONSTRAINT "Participates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestJoin" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,

    CONSTRAINT "RequestJoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestRecruit" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,

    CONSTRAINT "RequestRecruit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_teamName_key" ON "Projects"("teamName");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participates" ADD CONSTRAINT "Participates_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participates" ADD CONSTRAINT "Participates_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestJoin" ADD CONSTRAINT "RequestJoin_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestJoin" ADD CONSTRAINT "RequestJoin_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestRecruit" ADD CONSTRAINT "RequestRecruit_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestRecruit" ADD CONSTRAINT "RequestRecruit_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
