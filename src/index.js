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
		
	var currentUrl = request.url;
	console.log(currentUrl);
	
	// Check if the URL ends with a slash and two characters
	if (currentUrl.match(/\/[a-zA-Z]{2}$/)) {
		var lastTwoLetters = currentUrl.slice(-2);
		lastTwoLetters = lastTwoLetters.toLowerCase();
		lastTwoLetters = lastTwoLetters + ".png";
		
		 switch (request.method) {
     	 case 'GET':
        	const object = await env.JSBUCKET.get(lastTwoLetters);

	        if (object === null) {
    	      return new Response('Object Not Found', { status: 404 });
        	}

        	const headers = new Headers();
        	object.writeHttpMetadata(headers);
        	headers.set('etag', object.httpEtag);

        	return new Response(object.body, {
          	headers,
        	});
      
      default:
        return new Response('Method Not Allowed', {
          status: 405,
          headers: {
            Allow: 'GET',
          },
        });
    }
		
		
		
  		return new Response(' End in 2 Letters ' + lastTwoLetters);
		} 
		
	//If not, do the usual Auth message	
		else {
  			// Create a function to get the current time and format it
		function getCurrentTime() {
  		var currentTime = new Date();
  		var formattedTime = currentTime.toLocaleTimeString();
  		return formattedTime;
		}

		// Get the current time
	var currentTime = getCurrentTime();

		// Create an HTML response with the time
	var htmlResponse = "<!DOCTYPE html> <body> <p>"+request.headers.get("Cf-Access-Authenticated-User-Email")+ " authenticated at " + currentTime + " from <a href = https://tunnel.zachi.online/secure/"+ request.cf.country + ">" + request.cf.country + "</a> </p> </body> </html> " ;
	
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "text/html");
	
	const options = {
  		headers: myHeaders,
 		 };

	let response = new Response(htmlResponse, options);

		return response;
	}	
		
	
	},
};
