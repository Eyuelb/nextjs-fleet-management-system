CREATE TABLE IF NOT EXISTS "fleet" (
	"fleetID" uuid DEFAULT gen_random_uuid(),
	"vehicleID" uuid,
	"userID" uuid,
	"routeID" uuid,
	"approval" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "maintenance" (
	"id" uuid DEFAULT gen_random_uuid(),
	"vehicleID" uuid,
	"requestedByUserID" uuid,
	"description" text,
	"status" text,
	"requestedDate" date,
	"completedDate" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid DEFAULT gen_random_uuid(),
	"roleName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" uuid DEFAULT gen_random_uuid(),
	"startLocation" text,
	"endLocation" text,
	"distance" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"refresh_token" text,
	"access_token" text,
	"password" text,
	"image" text,
	"roleID" uuid NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" uuid DEFAULT gen_random_uuid(),
	"type" text,
	"make" text,
	"model" text,
	"year" integer,
	"licensePlate" text,
	"status" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_vehicleID_vehicles_id_fk" FOREIGN KEY ("vehicleID") REFERENCES "vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_routeID_routes_id_fk" FOREIGN KEY ("routeID") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_vehicleID_vehicles_id_fk" FOREIGN KEY ("vehicleID") REFERENCES "vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_requestedByUserID_user_id_fk" FOREIGN KEY ("requestedByUserID") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_roleID_roles_id_fk" FOREIGN KEY ("roleID") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
