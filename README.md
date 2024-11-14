This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### TASK V1

**[FRONTEND]**

Source site: [https://www.caben.org/](https://www.caben.org/)

- Build the site structure with the following pages: Home, Courses, About, and Access Account.
- **Home**: Add background image, text, and visuals.
- **Home**: Display purchased product cards if a product has been bought.
- **Courses**: Add product cards (photo, description, CTA button).
- **Courses**: Create individual course pages with Stripe payment button.
- **Courses**: Integrate Stripe with email prompt for the user.
- **Stripe**: Redirect to a dedicated page based on payment success or failure.
- **About Us**: Add text to the page.
- **Access Account**: Implement magic link authentication with NextAuth.
- Multi-language support with dictionaries.
- Create a theme file for easy editing of primary and secondary colors.

**[BACKEND]**

- Create an API for products with image, name, description, price, and Zoom URL.
- Integrate Resend to send emails.
- Integrate Prisma with Cloudflare.
- **Stripe**: On successful payment, create a user account with the email address.
- Link the purchased product ID to the user.
- **Stripe**: On successful payment, send an email with the Zoom link associated with the purchased product.






