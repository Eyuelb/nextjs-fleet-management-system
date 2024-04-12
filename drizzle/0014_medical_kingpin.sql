ALTER TABLE "fleet" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "fleet" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "maintenance" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "maintenance" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "maintenance" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "routes" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "vehicles" DROP COLUMN IF EXISTS "updatedAt";