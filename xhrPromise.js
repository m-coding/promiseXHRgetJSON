/**
 * A Promise based XHR function to get JSON data from external APIs
 *
 * Browser compatibility: Chrome, Edge, Firefox, Opera, Safari.
 * Internet Explorer does not support the Promise object natively.
 *
 *
 * @param {String} url - The request URL
 * @param {Object} options - A set of options for the request
 * @return {Promise} - The XHR request Promise
 */
function getJSON (url, options) {

    // Create the XHR request
    var request = new XMLHttpRequest();

    // Setup the Promise
    var xhrPromise = new Promise( (resolve, reject) => {

        // Setup our listener to process compeleted requests
        request.onreadystatechange = () => {

            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful, resolve the promise by passing back the request response
                resolve(request.response);
            } else {
                // If it fails, reject the promise
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }

        };

        request.onerror = () => {
            reject(Error('There was a network error.'));
        };

        // Convert the API params object to a serialized query string
        var query = options.apiquery;
        if(query !== null) {
            var query = "?" + Object
                .keys(query)
                .map(function(key){
                  return key+"="+encodeURIComponent(query[key]);
                })
                .join("&");
        }

        // Setup our HTTP request
         if(!options.method) options.method = 'GET';
        request.open(options.method, url + query, true); // method, url, async
        request.responseType = 'json';
        request.setRequestHeader('Accept', 'application/json');

        // Send the request
        request.send();

    });

    // Return the request as a Promise
    return xhrPromise;

} // getJSON
