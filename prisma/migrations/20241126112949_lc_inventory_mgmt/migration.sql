-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "phone_number" TEXT,
    "name" TEXT,
    "job_title" TEXT,
    "employee_id" TEXT,
    "account_type" TEXT NOT NULL DEFAULT 'viewer',
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" BIGSERIAL NOT NULL,
    "deviceid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "current_userId" TEXT,
    "locationId" TEXT,
    "purchase_cost" TEXT,
    "purchase_date" TIMESTAMP(3),
    "supplierId" TEXT,
    "purchase_orderid" BIGINT,
    "serial_number" TEXT,
    "modelId" TEXT,
    "imageId" TEXT,
    "byod" BOOLEAN NOT NULL,
    "notes" TEXT,
    "available" BOOLEAN NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" BIGSERIAL NOT NULL,
    "locationid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentLocationId" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" BIGSERIAL NOT NULL,
    "itemid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "current_userId" TEXT,
    "locationId" TEXT,
    "purchase_cost" TEXT,
    "purchase_date" TIMESTAMP(3),
    "supplierId" TEXT,
    "purchase_orderid" BIGINT,
    "serial_number" TEXT,
    "modelId" TEXT,
    "imageId" TEXT,
    "byod" BOOLEAN NOT NULL,
    "notes" TEXT,
    "available" BOOLEAN NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" BIGSERIAL NOT NULL,
    "supplierid" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "post_adress" TEXT NOT NULL,
    "email_adress" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" BIGSERIAL NOT NULL,
    "manufacturerid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageId" TEXT,
    "site_url" TEXT,
    "support_url" TEXT,
    "support_phone" TEXT,
    "support_email" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" BIGSERIAL NOT NULL,
    "modelid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageId" TEXT,
    "model_number" TEXT,
    "manufacturerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "categoryid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" BIGSERIAL NOT NULL,
    "logid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" BIGSERIAL NOT NULL,
    "statusid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" BIGSERIAL NOT NULL,
    "imageid" TEXT NOT NULL,
    "cdn_url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserImages" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceid_key" ON "Device"("deviceid");

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationid_key" ON "Location"("locationid");

-- CreateIndex
CREATE UNIQUE INDEX "Item_itemid_key" ON "Item"("itemid");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplierid_key" ON "Supplier"("supplierid");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_manufacturerid_key" ON "Manufacturer"("manufacturerid");

-- CreateIndex
CREATE UNIQUE INDEX "Model_modelid_key" ON "Model"("modelid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryid_key" ON "Category"("categoryid");

-- CreateIndex
CREATE UNIQUE INDEX "Log_logid_key" ON "Log"("logid");

-- CreateIndex
CREATE UNIQUE INDEX "Status_statusid_key" ON "Status"("statusid");

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageid_key" ON "Image"("imageid");

-- CreateIndex
CREATE UNIQUE INDEX "_UserImages_AB_unique" ON "_UserImages"("A", "B");

-- CreateIndex
CREATE INDEX "_UserImages_B_index" ON "_UserImages"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_current_userId_fkey" FOREIGN KEY ("current_userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("supplierid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("modelid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("manufacturerid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentLocationId_fkey" FOREIGN KEY ("parentLocationId") REFERENCES "Location"("locationid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_current_userId_fkey" FOREIGN KEY ("current_userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("supplierid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("modelid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("manufacturerid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manufacturer" ADD CONSTRAINT "Manufacturer_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("manufacturerid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserImages" ADD CONSTRAINT "_UserImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserImages" ADD CONSTRAINT "_UserImages_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
