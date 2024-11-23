/*
  Warnings:

  - A unique constraint covering the columns `[conversationId,userId]` on the table `ConversationHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "profilePic" TEXT;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "thumbnail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ConversationHistory_conversationId_userId_key" ON "ConversationHistory"("conversationId", "userId");

-- AddForeignKey
ALTER TABLE "ConversationHistory" ADD CONSTRAINT "ConversationHistory_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationHistory" ADD CONSTRAINT "ConversationHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
