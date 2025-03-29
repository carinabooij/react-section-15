React = client-side web application (runs in the browser)
API = application programming interface
REST API = web server that expose certain pre-defined routes (endpoints = URL's) to which HTTP requests and data can be sent.

React > HTTP Request > Backend ((REST) API) 

With NextJS or Remix you can build a fullstack React app (= blend frontend & backend)

HTTP documentation
https://developer.mozilla.org/en-US/docs/Web/HTTP

Creating a RESTful API with Node.js
https://www.youtube.com/watch?v=0oXYLzuucwE

Fetch can be used in an await, but than the function in which it is used must be an async function

async function(() => {
    const response = await fetch('url');
    ...
}).

Because a react component function can't be an async function, you can use then:

fetch('url').then((response) => {
    return response.json();
}).then((resData) => {
    setAvailablePlaces(resData.places); 
});

The fetch function should be placed in an useEffect with an empty dependencies array to avoid an infinite loop.

Fetch has default the GET method. 

Fetch PUT should look like this:

export async function updateUserPlaces(places) {
    fetch('http://localhost:3000/user-places', 
        { methode: 'PUT', 
          body: JSON.stringify(places), 
          header: {'Content-Type': 'application/json'}
        }
    );
}

Optimistic updating > updating local state before updating backend