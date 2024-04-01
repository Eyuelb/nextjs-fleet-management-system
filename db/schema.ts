import {
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  password: text('password'),
  image: text("image"),
});
