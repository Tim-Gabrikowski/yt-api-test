const port = 3000;
let CLIENT;

import Express from "express";

import {
	getOAuthClient,
	generateAuthUrl,
	getTokens,
	clientLogin,
	getYoutubeInstance,
} from "./gauth.js";

const app = Express();

app.get("/google-auth", (req, res) => {
	CLIENT = getOAuthClient();
	let url = generateAuthUrl(CLIENT);
	res.redirect(307, url);
});

app.get("/oauthcallback", async (req, res) => {
	const code = req.query.code;

	let tokens = await getTokens(CLIENT, code);
	CLIENT = clientLogin(CLIENT, tokens);

	res.send(tokens);
});

app.get("/my", async (req, res) => {
	try {
		const yt = getYoutubeInstance(CLIENT);

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
		const yt = getYoutubeInstance(CLIENT);

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
