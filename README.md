# Northcoder News

Reddit type news site

Repos;  
API: https://github.com/bluerface/public-nc-news-front  
Front: https://github.com/bluerface/public-nc-news-api

Demos;  
API: https://zl-northcoders-news-api.herokuapp.com/api  
Front: https://zl-northcoders-news.herokuapp.com

## Installation Instructions

1. Clone the project into your desired folder
2. Make sure you have node and npm installed
3. Install all dependencies:  
   `$ npm i`  
4. To serve the code, run one of the two servers;    
   Run the webpack dev server (served to localhost:8080);  
   `$ npm run dev`  
   Or use the express production server (served to localhost:3000);  
   `$ npm run build`  
   `$ npm start`
5. Run the tests or the linting;  
   `$ npm test`  
   `$ npm run lint`

## Technologies Used

#### Frontend
* React
* Redux
* React Router
* Redux Form
* Bulma css framework

#### Backend
* Express
* Mongodb/mongoose
* REST / CRUD API
* Passport (jwt & local)
* Mocha / chai tests
