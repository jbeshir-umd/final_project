# final_project
My repository for my Travel Planning App for INST 377!

Travel Planning App

- Description

A web app that lets you check weather, convert currency, and look up flight status all in one place. Built for my INST 377 class.

- Target Browsers

Desktop browsers (Chrome, Firefox, Edge). Works on mobile Chrome and Safari too (I hope) but designed for desktop.


- Developer Manual

You need Node.js installed (the nodejs.org site has the different installers). Then run in your terminal:

```
npm install
```

-- Running the App

```
npm start
```

Open your browser to http://localhost:3000

- Running Tests

No tests written yet.

--- API Endpoints

**GET /api/history** - gets the last 10 searches from the database

**POST /api/history** - saves a search to the database, needs `search_type` and `search_query` in the request body

**GET /api/weather?city=London** - returns current weather for a city from Weatherstack

**GET /api/currency** - returns exchange rates from Open Exchange Rates API

**GET /api/flights?flight=AA100** - returns flight status from Aviationstack

-  Known Bugs

- Weatherstack free plan only supports HTTP so if there are issues with the weather page that is probably why
- Aviationstack free plan has limited data, some flights wont return results
- No error handling on the frontend if the user submits an empty form
- The errors could be solved, but I just did not have the time / wasn't my main priority / I had other obligations lol

- Future Development

- Add user accounts so history is saved per person
- Add a help page
- Better error messages on the frontend
- I probably won't work on this after this class lol but this will be on my resume!

