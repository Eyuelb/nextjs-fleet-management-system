import {
  timestamp,
  pgTable,
  text,
  uuid,
  date,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("userID").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  password: text("password"),
  image: text("image"),
  roleID: uuid("roleID")
    .notNull()
    .references(() => roles.id),
});
export const roles = pgTable("roles", {
  id: uuid("roleID").primaryKey().defaultRandom(),
  roleName: text("roleName").notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: uuid("vehicleID").primaryKey().defaultRandom(),
  type: text("type"),
  make: text("make"),
  model: text("model"),
  year: integer("year"),
  licensePlate: text("licensePlate"),
  status: text("status"),
});

export const routes = pgTable("routes", {
  id: uuid("routeID").primaryKey().defaultRandom(),
  startLocation: text("startLocation"),
  endLocation: text("endLocation"),
  distance: numeric("distance"),
});

export const maintenance = pgTable("maintenance", {
  id: uuid("requestID").primaryKey().defaultRandom(),
  vehicleID: uuid("vehicleID").references(() => vehicles.id),
  requestedByUserID: uuid("requestedByUserID").references(() => users.id),
  description: text("description"),
  status: text("status"),
  requestedDate: date("requestedDate"),
  completedDate: date("completedDate"),
});

export const fleet = pgTable("fleet", {
  id: uuid("fleetID").primaryKey().defaultRandom(),
  vehicleID: uuid("vehicleID").references(() => vehicles.id),
  userID: uuid("userID").references(() => users.id),
  routeID: uuid("routeID").references(() => routes.id),
  approval: text("approval"),
});