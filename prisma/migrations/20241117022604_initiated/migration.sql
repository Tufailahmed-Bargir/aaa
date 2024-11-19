-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagId" SERIAL NOT NULL,
    "postsId" INTEGER NOT NULL,
    "tags" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tagId_key" ON "Tags"("tagId");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
