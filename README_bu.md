# RUN DEV ENV
npm i
npm run dev
open http://localhost:3000
# COMPILE
npm run build

# RUN PROD ENV
npm run start
TODO:
validation
typescript
comments
table display when data is empty -- DONE
table height will jump -- DONE
selection (single and all)
responsive table -- DONE
loading icon for table data
error message between frontend and backend

need to show where this is done:
• Implement a user interface that allows users to:
o View a list of documents and folders
o Add a new document
o Add a new folder

Vistra Platform Coding Assignment

o (Bonus) Search across documents and folders

# Test
 PASS  test/page.test.tsx
  DocumentsPage Component
    ✓ renders buttons (61 ms)
    ✓ opens folder modal when Create Folder is clicked (82 ms)
    ✓ opens upload modal when Upload File is clicked (27 ms)
    ✓ shows error toast when folder name is empty (48 ms)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
