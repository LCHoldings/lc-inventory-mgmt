CREATE TABLE "categories" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"type" varchar
);
--> statement-breakpoint
CREATE TABLE "devices" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"status_id" varchar,
	"current_user_id" varchar,
	"location_id" varchar,
	"purchase_cost" varchar,
	"purchase_date" date,
	"supplier_id" varchar,
	"purchase_order_id" varchar,
	"serial_number" varchar,
	"model_id" varchar,
	"image" varchar,
	"byod" boolean,
	"notes" text,
	"available" boolean,
	"manufacturer_id" varchar,
	"category_id" varchar
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"status_id" varchar,
	"current_user_id" varchar,
	"location_id" varchar,
	"purchase_cost" varchar,
	"purchase_date" date,
	"supplier_id" varchar,
	"purchase_order_id" varchar,
	"serial_number" varchar,
	"model_id" varchar,
	"image" varchar,
	"byod" boolean,
	"notes" text,
	"available" boolean,
	"manufacturer_id" varchar,
	"category_id" varchar,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "logs" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"user_id" varchar,
	"action" varchar,
	"item" varchar,
	"item_type" varchar
);
--> statement-breakpoint
CREATE TABLE "manufacturers" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"image" varchar,
	"site_url" varchar,
	"support_url" varchar,
	"support_phone" varchar,
	"support_email" varchar
);
--> statement-breakpoint
CREATE TABLE "models" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"image" varchar,
	"model_number" varchar,
	"manufacturer_id" varchar,
	"category_id" varchar
);
--> statement-breakpoint
CREATE TABLE "statuses" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"name" varchar,
	"color" varchar,
	"default" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" varchar PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"website" varchar,
	"phone_number" varchar,
	"contact_person" varchar,
	"post_adress" varchar,
	"email_adress" varchar
);
--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;