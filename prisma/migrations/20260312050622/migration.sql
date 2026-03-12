-- CreateIndex
CREATE INDEX "retailers_name_phone_uid_idx" ON "retailers"("name", "phone", "uid");

-- CreateIndex
CREATE INDEX "retailers_areaId_distributorId_territoryId_idx" ON "retailers"("areaId", "distributorId", "territoryId");
