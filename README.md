# Token Buddy
This is a React project that is used to display tokens for the popular trading card game <i>Magic: the Gathering</i>.

## Deployment
Token Buddy's front end is currently deployed on Netlify.

Current Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/13970a50-c49d-4046-9f52-60a9dbd4c6bf/deploy-status)](https://app.netlify.com/sites/tokenbuddy/deploys)

URL: https://tokenbuddy.netlify.app
## Dependencies
- [Node.js](https://nodejs.org/en/)
- [Token Buddy Backend](https://github.com/Gchollett/TokenBuddyBackend)
## Quick Setup Guide
First, make sure you have all of the dependencies installed.

Second, clone the repository to your local environment using the following command in your terminal:
```bash
git clone <repository>
```
Third, run the following command in the directory:
```bash
npm install
```
This will install all of the dependencies needed to run the application.

Lastly, create a file in the root directory named <code>.env.local</code> and copy the code from the <code>.env.local.template</code> file provided.

After this, you are ready to start running the server locally.
## Running On Development Side
To run the server, you will first need to run an instance of your backend server. This instance will need to share the same url as the one in the <code>.env.local</code> file.

After doing so, run the development server using the followign commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.