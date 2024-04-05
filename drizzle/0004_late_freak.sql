ALTER TABLE "maintenance" RENAME TO "maintenanceRequests";--> statement-breakpoint
ALTER TABLE "fleet" RENAME COLUMN "id" TO "fleetID";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "id" TO "roleID";--> statement-breakpoint
ALTER TABLE "routes" RENAME COLUMN "id" TO "routeID";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "userID";--> statement-breakpoint
ALTER TABLE "vehicles" RENAME COLUMN "id" TO "vehicleID";--> statement-breakpoint
ALTER TABLE "maintenanceRequests" RENAME COLUMN "id" TO "requestID";--> statement-breakpoint
ALTER TABLE "fleet" DROP CONSTRAINT "fleet_vehicleID_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "fleet" DROP CONSTRAINT "fleet_userID_users_id_fk";
--> statement-breakpoint
ALTER TABLE "fleet" DROP CONSTRAINT "fleet_routeID_routes_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_roleID_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "maintenanceRequests" DROP CONSTRAINT "maintenance_vehicleID_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "maintenanceRequests" DROP CONSTRAINT "maintenance_requestedByUserID_users_id_fk";
--> statement-breakpoint
ALTER TABLE "fleet" ADD PRIMARY KEY ("fleetID");--> statement-breakpoint
ALTER TABLE "fleet" ALTER COLUMN "fleetID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD PRIMARY KEY ("roleID");--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "roleID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "routes" ADD PRIMARY KEY ("routeID");--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "routeID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("userID");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "userID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD PRIMARY KEY ("vehicleID");--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vehicleID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "maintenanceRequests" ADD PRIMARY KEY ("requestID");--> statement-breakpoint
ALTER TABLE "maintenanceRequests" ALTER COLUMN "requestID" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_vehicleID_vehicles_vehicleID_fk" FOREIGN KEY ("vehicleID") REFERENCES "vehicles"("vehicleID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_userID_users_userID_fk" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_routeID_routes_routeID_fk" FOREIGN KEY ("routeID") REFERENCES "routes"("routeID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_roleID_roles_roleID_fk" FOREIGN KEY ("roleID") REFERENCES "roles"("roleID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenanceRequests" ADD CONSTRAINT "maintenanceRequests_vehicleID_vehicles_vehicleID_fk" FOREIGN KEY ("vehicleID") REFERENCES "vehicles"("vehicleID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenanceRequests" ADD CONSTRAINT "maintenanceRequests_requestedByUserID_users_userID_fk" FOREIGN KEY ("requestedByUserID") REFERENCES "users"("userID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "description";