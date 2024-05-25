# YT-API-TEST

Simple test for the youtube API using express and oauth

## setup

1. Clone the Repo
2. Run `npm install`
3. Create Google [oAuth client ID](https://console.cloud.google.com/apis/credentials) and store the JSON file to `client_secret.json`. As `redirect url` use `http://localhost:3000/oauthcallback`.

## run

1. Run the App using `npm run dev`
2. Open `http://localhost:3000/google-auth` to log in with google Auth
3. Use the `/search?t=` route to perform youtube search
