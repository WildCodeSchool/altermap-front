
# Altermap app

  

## Altermap was developed by 4 teammates of Wild Code School ( Tours campus )

  

## Technology used :

  

### Front-end

  

- ReactJs for the rendering

- Leaflet Js for the map

- React Admin for admin part (obviously)

  

### Back-end

  

- NodeJs with Express

- PostgreSql for database

- Sequelize as ORM

  

## Principal informations

  

- React Hooks but no Redux

- Auto deploy with Github Action

- Server is a NGINX

  

## Development documentation

  

**For git shemas we use this convention : feature/your-feature**

  

### Principal components :

- App.js with the Router

- Mapper.js contains all map features

- Index.css contains all css features

  
  

### Dependencies used

* Main :

	- Leaflet / react-leaflet ( for the map )

	- React-router-dom ( to create router in App.js)

	- React-admin ( for the admin part )

	- Axios ( queries )

  

* Tools :

	- React-leaflet-draw ( add icons of creation, edition and deletion of polygons )

	- React-bow-zoom ( use to zoom by area )

	- Domtoimage ( to take screenshot of map, use for pdf export)

	- Pdflib ( it create pdf with image, can be customize easily)

  

* Miscellaneous :

	- Downloadjs ( use to start download of anything, use for pdf export )

	- Fortawesome for react ( icons )

  

## Start the app :

First step :

- You need to `git clone` this project, it includes ( [front](https://github.com/WildCodeSchool/altermap-front) and [back](https://github.com/WildCodeSchool/altermap-back) )

  

Step two :

- Open a terminal in the cloned project and type `git checkout dev`

-  Also type `npm install`

- Start project with `npm start`

- It's gonna open a window on localhost:3000

Step three :

- Start coding !  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).