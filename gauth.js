import { google } from "googleapis";
import { SCOPES, OAUTH_CLIENT_SECRETS } from "./googleconf.js";

export function getOAuthClient(tokens) {
	let oauth2Client = new google.auth.OAuth2(
		OAUTH_CLIENT_SECRETS.client_id,
		OAUTH_CLIENT_SECRETS.client_secret,
		OAUTH_CLIENT_SECRETS.redirect_uris[0]
	);
	if (tokens) oauth2Client.setCredentials(tokens);
	return oauth2Client;
}

export function clientLogin(client, tokens) {
	console.log("login", tokens);
	client.setCredentials(tokens);
	return client;
}

export function generateAuthUrl(client) {
	return client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});
}

export async function getTokens(client, code) {
	return (await client.getToken(code)).tokens;
}
export function getYoutubeInstance(client) {
	return google.youtube({ version: "v3", auth: client });
}
