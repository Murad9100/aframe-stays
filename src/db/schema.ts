import { sql } from "drizzle-orm";
import {
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const houses = pgTable("houses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  titleRu: text("title_ru"),
  description: text("description").notNull().default(""),
  descriptionEn: text("description_en"),
  descriptionRu: text("description_ru"),
  region: text("region").notNull().default(""),
  dailyPrice: integer("daily_price").notNull().default(0),
  guests: integer("guests").notNull().default(4),
  features: jsonb("features").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  images: jsonb("images").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  lat: doublePrecision("lat").notNull().default(41.3597),
  lng: doublePrecision("lng").notNull().default(48.5124),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blockedDates = pgTable(
  "blocked_dates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    houseId: uuid("house_id")
      .notNull()
      .references(() => houses.id, { onDelete: "cascade" }),
    startDate: date("start_date", { mode: "string" }).notNull(),
    endDate: date("end_date", { mode: "string" }).notNull(),
    status: text("status").notNull().default("blocked"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("idx_blocked_dates_house").on(t.houseId)],
);

export type HouseRow = typeof houses.$inferSelect;
export type BlockedDateRow = typeof blockedDates.$inferSelect;