// Test URLs to hit with requests
URLs = ["https://upload.wikimedia.org/wikipedia/commons/1/1e/Caerte_van_Oostlant_4MB.jpg",
	"https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_(5mb).jpg",
	"https://upload.wikimedia.org/wikipedia/commons/3/3c/Enrique_Simonet_-_Marina_veneciana_6MB.jpg"];
		
ratesum = 0;		// Net sum of the trials gathered from the URLs above

findSpeed(0);		// The function call you'd use to start the process :)

// Simple cache busting appending function in "Base64". This essentially makes repeating URLs near-impossible
// for our purpose, and prevents the web browser from accessing the test image from the cache, effectively
// "busting" the browser's cache capabilties and giving us accurate measurements from internet requests.
// This works because web servers (the ones we're contacting at least) typically ignore whatever comes 
// after the question mark (called a query) unless they're written into the server.
function cachebust()
{
	var base64set = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var str = "?v=";
	
	for (var i = 0; i < 12; i++)
		str += base64set[Math.floor(Math.random() * 64)];
		
	return str;
}

// Recursive function that evaluates all URLs one-by-one and records the time to contact each one
function findSpeed(i)
{
	var request = new XMLHttpRequest();			// API we're using
	request.open("GET", URLs[i] + cachebust(), true);	// Open the URL with a random Base64 string
	
	request.onreadystatechange = function()
	{
		// Ready State 2 means the request has been sent, so mark the time now
		if (request.readyState == 2)
			now = (new Date).getTime();
		
		// Ready State 4 means the request has returned
		if (request.readyState == 4 && request.status == 200)
		{	
			// Mark the seconds elapsed and convert the response from bytes to megabits
			var seconds = ((new Date).getTime() - now) / 1000;
			var megabits = request.responseText.length / 125000;
			
			ratesum += megabits/seconds;	// Add on the current rate that was found
			
			// If not on the final iteration, do recursive call for the next URL
			if (i+1 < URLs.length)
				findSpeed(i+1);
			
			// Otherwise average out the results and log them to the console
			else
				console.log((ratesum / URLs.length).toFixed(1))
			
		}
	}
	
	// Send the request (this is asynchronous)
	request.send();
}
