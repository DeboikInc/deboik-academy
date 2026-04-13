# Deboik Academy Website

Universal JavaScript course marketing and enrollment platform.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Environment Setup

Copy `.env.example` to `.env.local` and add your Paystack keys:

```
PAYSTACK_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_BASE_URL=https://academy.deboik.com
```

## Deployment

**Vercel (Recommended):**
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Configure domain: academy.deboik.com

**Build:**
```bash
npm run build
npm start
```

## Pages

- `/` - Home (course overview, benefits, pricing)
- `/about` - About (mission, teaching approach)
- `/course` - Course details (full curriculum)
- `/enroll` - Registration & payment
- `/enroll/success` - Payment confirmation

## Tech Stack

- Next.js 14
- React
- Tailwind CSS
- Paystack (payments)