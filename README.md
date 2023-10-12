# Token Buddy
This is a React project that is used to display tokens for the popular trading card game <i>Magic: the Gathering</i>.

## Deployment
Token Buddy's front end is currently deployed on Netlify.

Current Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/13970a50-c49d-4046-9f52-60a9dbd4c6bf/deploy-status)](https://app.netlify.com/sites/tokenbuddy/deploys)

URL: https://tokenbuddy.netlify.app
## Running On Development Side
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This will just get the static page. To get the cards from the database, you will also need an instance of the [backend server](https://github.com/Gchollett/TokenBuddyBackend).

After, set up a <code>.env.local</code> file in the root directory just like the template.
This will like the frontened and backend together.