import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  questions: jsonb('questions').$type<Array<{ id: string; question: string; answer?: string }>>(),
  answers: jsonb('answers').$type<Record<string, string>>(),
  documents: jsonb('documents').$type<{
    userJourney?: string;
    prd?: string;
    frontend?: string;
    backend?: string;
    database?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})