# NextJS Auhtentication [(Click to visit)](https://next-js-authentication-mauve.vercel.app/)

🔐 Hey there! This is my Next.js project where I'm learning about authentication. I'm using bcryptjs to keep things secure, and jsonwebtoken to hide and store the secret stuff. For testing emails, I'm using Mailtrap. But heads up, only I can see those test emails. If you're curious and want to play around, feel free to use the guest account:
- Email: guest@gmail.com
- Password: 1234

Enjoy exploring! 😊

### npm packages

- #### axios
- #### bcryptjs
- #### jsonwebtoken
- #### nodemailer
  we are using mailtrap to send verification mail to user. nodemailer used to connect to mailtrap and send mail. Go to mailtrap Email Testing section and then create inbox and go to the setting and select the nodemailer option and grab the code for connection.
- #### react-hot-toast
- #### mongoose

### Database connection on request

Next.js edge functions are ephemeral, meaning that they are created and destroyed on demand. This is because edge functions are designed to be as fast and efficient as possible, and keeping database connections open can be a drain on resources.

Due to nextjs edge run time database not alway stay connected in nextjs app, everytime you make a request a connection make to database and execute your request and then connection is lost. This can lead to performance problems, especially if the database is located far away from the edge server.

<b>So Database connection(dbConfig.ts) function needed on every file that make request to database.</b>

### env variables

- MONGO_URI
- TOKEN_SECRET
- DOMAIN
- MAIL_TRAP_USER
- MAIL_TRAP_PASS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
