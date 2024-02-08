/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		
		// Create a function to get the current time and format it
	function getCurrentTime() {
  		var currentTime = new Date();
  		var formattedTime = currentTime.toLocaleTimeString();
  		return formattedTime;
		}

		// Get the current time
	var currentTime = getCurrentTime();

		// Create an HTML response with the time
	var htmlResponse = "<!DOCTYPE html> <body> <p>the current time is: " + currentTime + "</p> </body> </html> " + request.cf.country +request.headers.get("Cf-Access-Authenticated-User-Email");



		return new Response(htmlResponse);
	},
};
