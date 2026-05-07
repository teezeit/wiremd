import { pgTable, text, timestamp, unique, index } from "drizzle-orm/pg-core";

export const project = pgTable("project", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  lockedBy: text("locked_by"),
  lockedName: text("locked_name"),
  lastEditorName: text("last_editor_name"),
});

export const projectFile = pgTable(
  "project_file",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    path: text("path").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    projectPathUnique: unique("project_file_project_id_path_unique").on(t.projectId, t.path),
    projectIdIdx: index("project_file_project_id_idx").on(t.projectId),
  }),
);

export type Project = typeof project.$inferSelect;
export type ProjectFile = typeof projectFile.$inferSelect;

export const INDEX_PATH = "index.md";
