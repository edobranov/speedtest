# speedtest.js
A simple asynchonous recursion-based speed test using the XMLHttpRequest API


To run, integrate it into an HTML file using `<script src="..."></script>` and call the main function as seen in speedtest.js


In order to prevent cacheing of images, I used a technique called *cache busting*. A random Base64 string is attached to the end of each URL as a query. Since the servers ignore the query (in this case) but browsers do not, the browser re-downloads the "different" image in almost all scenarios (since the chance that two Base64 strings of length 12 are the same is 1 ÷ 64<sup> 12</sup> = 2.12 * 10<sup> -22</sup>)
