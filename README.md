# Quiz App
Quiz App is a web application for geographical quizzes based on openstreetmap data.

Application enables user to pick a quiz about administrative division of a specific area by selecting an area on the map where the quiz will be based and then selecting administrative units to be guessed in the quiz.

In the quiz user is prompted to click areas on the map given their name. User answers by clicking appropriate areas on the map until all of the areas are guessed.

## Installation
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
Main class of the app is **MapLoader** class responsible for loading the map with all the controls. It posseses a reference to an **EventHandler** object which is either of type **QuizChooser** or **QuizHandler**. It determines in which mode the map is at the moment and provides event handlers for click events for areas on the map.

In quiz chooser mode user chooses the quiz by clicking the areas on the map. Upon clicking an area its administrative division data is fetched. Currently loaded area is stored in an object of type **MapArea** which is of type **World** or **AdminUnit**. These classes form a *state* design pattern. They provide methods to get the data essential to display the map and create control in the top right corner.

The aforementioned control of type **ChooserControl** contains buttons of type **QuizLoaderButton** used to load the quiz.

In quiz handler mode user is prompted to click areas on the map. All the areas names are stored in **QuizData** data structure and **QuizHandler** uses an *iterator* to get them. Upon clicking an area result is shown in the control **QuizControl** and on the map then **FunctionWithTimeout** object is created containing a function that resets the state of the map. This forms a *command* design pattern and is executed when the timeout of two seconds elapses or another area is clicked.

When the QuizData data structure empties the quiz ends and **ResultsBanner** is displayed.
During the entire time **ReturnButton** occupies the bottom right corner enabling users to go back to the starting view any moment. Both buttons inherit from **AbstractButton** which constructor is a *template method*.

Styles for areas on the map are provided by **PolygonStyles** object and all the data are fetched by **DataFetcher** object which is a *singleton* and provides a *facade* to the server side.
