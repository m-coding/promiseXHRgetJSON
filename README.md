# promiseXHRgetJSON

## Background
Created the `getJSON` function in a past project to get data when calling an API. Might be useful in the future or maybe someone else out there could use it too.

## Usage
#### Example
```javascript
var  params = {
    'userId': 1234,
};

getJSON('http://domain.com/something/api', {
    method: 'GET',
    apiquery: params,
})
.then(function (json) {
    console.log('Success!', json)
})
.catch(function (error) {
    console.log('API Failure: ' + error.status + ' ' + error.statusText);
});
```

#### Live Example

See [index.html](http://m-coding.github.io/promiseXHRgetJSON/), demo using [JSONPlaceholder](https://jsonplaceholder.typicode.com/):

```javascript
var  params = {
    'albumId': 36,
    'id': 1751,
};
var result;

getJSON('https://jsonplaceholder.typicode.com/photos/', {
    method: 'GET',
    apiquery: params,
})
.then(function (json) {
    result = '<b>albumId:</b> ' + json[0].albumId;
    result += ' <b>id:</b> ' + json[0].id;
    result += '<h2>' + json[0].title + '</h2>';
    result += '<img src="' + json[0].thumbnailUrl + '" >';
    document.getElementById("content").innerHTML = result;
})
.catch(function (error) {
    result = 'API Failure: ' + error.status + ' ' + error.statusText;
    document.getElementById("content").innerHTML = result;
});
```