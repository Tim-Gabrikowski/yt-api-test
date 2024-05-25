const port = 3000;

import { google } from "googleapis";
import { readFileSync } from "fs";
import Express from "express";
const app = Express();

const oauth_client_secrets = JSON.parse(readFileSync("./client_secret.json"));

const oauth2Client = new google.auth.OAuth2(
	oauth_client_secrets.web.client_id,
	oauth_client_secrets.web.client_secret,
	oauth_client_secrets.web.redirect_uris[0]
);

const SCOPES = [
	"https://www.googleapis.com/auth/youtube.readonly",
	"https://www.googleapis.com/auth/youtube",
];

app.get("/google-auth", (req, res) => {
	const url = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});
	res.redirect(307, url);
});

app.get("/oauthcallback", async (req, res) => {
	const code = req.query.code;
	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);
	console.log(tokens);
	res.send(tokens);
});

app.get("/my", async (req, res) => {
	try {
		const yt = google.youtube({ version: "v3", auth: oauth2Client });
		let c = await yt.channels.list({
			part: "id,snippet,statistics,contentDetails",
			mine: true,
		});
		res.send(c.data.items[0]);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

app.get("/search", async (req, res) => {
	const searchTerm = req.query.t;

	try {
		const yt = google.youtube({ version: "v3", auth: oauth2Client });
		let vids = await yt.search.list({
			part: "id,snippet",
			q: searchTerm,
		});
		res.send(vids.data);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
