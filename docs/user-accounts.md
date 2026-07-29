# User accounts

This module uses Supabase Auth for public site accounts. Account code lives in `src/features/auth`, Supabase helpers live in `src/lib/supabase`, and database changes live in `supabase/migrations`.

## One-time Supabase setup

1. Create a Supabase project.
2. In the project Connect dialog, copy the Project URL and Publishable key into a local `.env.local` file using `.env.example` as the template.
3. In the Supabase SQL Editor, run `supabase/migrations/20260729_create_profiles.sql`.
4. In Authentication → URL Configuration, add your local URL (`http://localhost:3000`) and the production URL as redirect URLs.
5. Enable Email confirmation in Authentication → Providers if you want every new account to verify its email.

## Roles

- `user`: public account holder
- `reviewer`: can be granted access to future review workflows
- `editor`: can manage catalog data in future protected tools
- `admin`: manages users and roles

Never expose a Supabase service-role key in the browser or commit `.env.local`.
