# MGeoCode
## Moroccan geolocation API.

##### What is MGeoCode ? 
 **MGeoCode** is geolocation API that provides statistical data for your web/mobile application in the form of a grid-zone system mainly for location related applications.
 
 
 ##### How does it work ?
 The MGeoCode process breaks down to the following tasks :
 [x] Create account.
 [x] Generate an API key.
 [x] Choose a city to work with and generate grid to suit your precision purposes (small, medium, large).
 [x] Make post requests with coordinates of your users.
 [ ] Location will be saved to our database with the exact zone it was made from.
 [x] Login to your user interface to display and analyse data.
 
 ##### How to start?
 After creating your account and login in you will be directed to your user interface, which you will be able to use to generate your API key :
 ![API_KEY_IMAGE](https://i.ibb.co/ZxC3YWH/snapshot-1595868908907.jpg)
 
  After creating of your api key you will be able to send post requests to the following URL : 
      
      https://safe-brushlands-36983.herokuapp.com/insert-data/API_KEY_HERE
      
      
      the post request should contain the following JSON body : 
      {
        "lat": *LATITUDE COORDINATE*,
        "lng": *LONGITUDE COORDINATE*
      }
      
   
      
 #### How to display data?
 
 After sending enough information you can login into your user interface and click on the **show grid** button , and then the config drop down -> Genrate Statistics, you can click at the colored grids to see the zone statistical data and 
 you ll find the rest UI is self explanatory (grids are color coded -> vivid color = more requests from zone):
 ![MGeoCode UI](https://i.ibb.co/Z1VXsFV/snapshot-1595870555489.jpg)
      
 
