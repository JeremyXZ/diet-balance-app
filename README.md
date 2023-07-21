This app aims to inform users about the combined ratio of omega-6 intake to omega-3 intake in the foods they intend to consume and alert them to unhealthy ratios. All the food facts are compiled manually by citing the data from myfooddata website.

# Planned main features and usage:

- A sortable table displaying common foods, their default content, and ratio of omega-6 to omega-3, as well as actual amounts based on the weight of the food and the combined ratio.
- Users can input the weight (in grams) in the first column and view the results on the same row.
- A large bar chart showing the ratio of omega-6 to omega-3 will be fixed on top of the page. Its color will change depending on the cutoff point: red if the ratio is larger than 4:1 (omega-6:omega-3), and green if the ratio is smaller.
- PostgreSQL (cloud-based) will be used to store the food information.
- Next.js will be used to render the UI and handle API calls.
- Prisma will be used to connect to the database in this Next.js project.
- React data table will be used to construct the food table.

# Below is the Original README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
