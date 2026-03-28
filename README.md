# DealFlow Checklist

A simple workflow app for complex multi-step transactions.

## Why this repo exists
The goal is to show how a product engineer can simplify a high-friction user journey by making progress, blockers, and ownership visible at every step.

## What it does
- tracks transaction stages
- assigns an owner to each stage
- stores notes per stage in the UI state
- computes completion progress
- generates a concise progress summary

## Stack
- Next.js
- TypeScript
- OpenAI API (optional)

## Demo mode
If no API key is configured, the summary endpoint returns a local heuristic summary.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Product angle
This repo demonstrates workflow simplification, UX clarity, and a product-oriented approach to complex transactional flows.

## Resume line
Built a lightweight workflow tracker for complex transactions with stage ownership, progress visibility, and AI-assisted next-step summaries.
