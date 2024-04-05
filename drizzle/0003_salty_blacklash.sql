ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "fleet" DROP CONSTRAINT "fleet_userID_user_id_fk";
--> statement-breakpoint
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_requestedByUserID_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_roleID_roles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet" ADD CONSTRAINT "fleet_userID_users_id_fk" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_requestedByUserID_users_id_fk" FOREIGN KEY ("requestedByUserID") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_roleID_roles_id_fk" FOREIGN KEY ("roleID") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");