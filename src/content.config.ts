import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ── Projects ────────────────────────────────────────────────────
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    // offensive | defensive | grc | tooling
    category: z.enum(["offensive", "defensive", "grc", "tooling"]),
    skills: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

// ── Writeups (CTF + Lab, distinguished by `kind`) ───────────────
const writeups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["ctf", "lab"]),
    // e.g. picoCTF, HackTheBox, OWASP Juice Shop, PortSwigger...
    platform: z.string(),
    // web | pwn | crypto | rev | forensics | ad | cloud | ai | osint | misc
    category: z.string(),
    difficulty: z.enum(["easy", "medium", "hard", "insane"]).default("medium"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups };
