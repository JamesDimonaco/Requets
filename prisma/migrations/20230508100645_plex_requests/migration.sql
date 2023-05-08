-- CreateTable
CREATE TABLE "PlexRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlexRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlexRequest" ADD CONSTRAINT "PlexRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
