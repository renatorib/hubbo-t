import { doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: doublePrecision().notNull(),
});
