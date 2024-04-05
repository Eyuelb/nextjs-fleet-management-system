ALTER TABLE "maintenanceRequests" RENAME TO "maintenance";--> statement-breakpoint
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenanceRequests_vehicleID_vehicles_vehicleID_fk";
--> statement-breakpoint
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenanceRequests_requestedByUserID_users_userID_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_vehicleID_vehicles_vehicleID_fk" FOREIGN KEY ("vehicleID") REFERENCES "vehicles"("vehicleID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_requestedByUserID_users_userID_fk" FOREIGN KEY ("requestedByUserID") REFERENCES "users"("userID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
