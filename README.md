## Demo site: https://diet-balance-app.vercel.app/

This app aims to inform users about the combined ratio of omega-6 intake to omega-3 intake in the foods they intend to consume and alert them to unhealthy ratios. All the food facts are compiled manually by citing the data from myfooddata website.

# Main features and usage:

- A sortable (for all columns) table displays common foods, their default content, and ratio of omega-6 to omega-3, actual amounts based on the weight of the food and the aggregate ratio.
- Users can enter (type a number and click "Enter") the weight (in grams) in the first column and see the results immediately on the same row. A red number indicates an unhealthy Omega-6:Omega-3 ratio, which is larger than the recommended 4:1. On the other hand, a green number means a healthy ratio.
- Users can easily toggle the display of Omega-3 and Omega-6 content/intake columns by clicking "Toggle Intake Columns." This feature is particularly helpful for users on smaller screens.
- Users can click "Show/Save Results" button to show only the checked foods and/or save the results into a csv file.
- A doughnut chart will display the relative portions of omega-6 and omega-3 at the top of the page.

# Technologies Used

- Next.js13 and Typescript: UI rendering and API handling.
- PostgreSQL (cloud-based): Data storage for food information.
- Prisma: Database connection for Next.js.
- React data table: Constructing the food table.
- react-chartjs-2: Generating doughnut charts.
- pgAdmin4: Creating and managing food data.

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
