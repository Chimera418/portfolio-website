---
title: "Calculator Pro"
description: "A satirical full-stack web application where every math operation is gated behind microtransactions. Built with Next.js, TypeScript, Tailwind CSS v4, Prisma, and Razorpay."
tags: ["Next.js", "TypeScript", "PostgreSQL", "Razorpay", "Prisma"]
link: "https://calculator-pro-tau.vercel.app/"
github: "https://github.com/Chimera418/calculator-pro"
order: 4
date: "2026-04"
---

## Overview

Calculator Pro is a satirical, production-quality full-stack web application with a deadpan premise: **every mathematical operation is a paid microtransaction**. Addition and subtraction are free. Multiplication costs ₹49. Division costs ₹79. The equals button (`=`) costs ₹2,999.

Behind the comedic concept is an authentic, full-stack architecture built to explore modern payment workflows, resilient authentication, and parser theory.

## Key Features

- **Pure Expression Engine**: Built with a custom tokenizer and Shunting-Yard parser (zero `eval`). Operates as a pure engine gated at the boundaries—throwing a strict `FeatureLockedError` the moment an un-purchased operator is evaluated.
- **Razorpay Payment Integration**: Full end-to-end payment gateway lifecycle with server-side signature verification using constant-time HMAC comparison, order creation, and idempotent webhook handlers.
- **Auth.js (NextAuth v5)**: OAuth authentication supporting GitHub and Google sign-ins, persisting unlocked features and calculation histories per user across sessions.
- **Database Architecture**: PostgreSQL hosted on Neon, managed through Prisma ORM with strict schema migrations and seeding scripts.
- **Satirical Polish**: Clean, modern UI styled with Tailwind CSS v4, CSS custom-property theme toggling, Framer Motion unlock animations, and test-card simulation modes.

## Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI primitives, Lucide icons
- **Database**: PostgreSQL (Neon Serverless) via Prisma ORM
- **Authentication**: Auth.js / NextAuth v5 (Google + GitHub)
- **Payments**: Razorpay Node SDK with server-side HMAC validation
- **Testing**: Vitest + React Testing Library unit test suite for arithmetic engine and purchase gates
