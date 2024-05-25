import { readFileSync } from "fs";

export const SCOPES = [
	"https://www.googleapis.com/auth/youtube.readonly",
	"https://www.googleapis.com/auth/youtube",
];
export const OAUTH_CLIENT_SECRETS = JSON.parse(
	readFileSync("./client_secret.json")
).web;
