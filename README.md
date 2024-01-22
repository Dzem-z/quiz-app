# quiz-app
Overpass based app for solving geography quizzes

## instalation
In order to install quiz-app you need to have npm(node) installed and sql daemon as well on your computer.

to setup project run:
```
npm install
sudo npm run init
```

and then to start:

```
npm run start
```

## Server side 
Application fetches openstreetmap data regarding administrative units using OverpassAPI. Data about available countries are stored on the server in a database.

## Client side
Application enables user to pick a quiz about administrative division of a specific area by selecting an area on the map where the quiz will be based and then selecting administrative units to be guessed in the quiz. In the quiz user answers by clicking appropriate areas on the map. Map is made with Leaflet framework.
