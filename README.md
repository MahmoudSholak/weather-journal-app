# weather-journal-app
Second project of FWD course for web development (Professional Track)
---
### Goals & Idea :
- An Asynchronous web app that uses Web API and user data to dynamically update the UI for a Weather-Journal App.
---
### HTML & CSS
using the structure of fwd from Github and adding some elements & modification.

### app.js
1. Define some Global variable like **button**,**apiKey** .... .
2. Make Async Function to get temperature from the zip code from the client side.
3. Make Async Function and user **Fetch** in it to deal with server when send data to save it with **POST Method** and get it again with **GET Method**.
4. Make Async Function to show Data and make the website dynamic.
5. Add Eventlistener on button when click to control in all functions and excute it and add some check on it to make sure the user enter **zip code & feelings & the zip code is correct**.

### server.js
1. Install **Node & Express**.
2. Install **body-parser & cors** Package.
3. Sure The Local server is running and producing feedback to the Command Line through a working callback function.
4. Add an entry to the project endpoint using a POST route setup on the server side and save the data in projectData variable.
5. Add an GET route callback function to return the JS object.
