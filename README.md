#Buttfest control panel

##Setup
Get this running and then set up the front end: [jhickey/buttfest](https://github.com/jhickey/buttfest)

Install dependencies:
```
npm i
```

Then run it:
```
npm start
```

That's pretty much it!


##Endpoints

###`POST /temperature` Set the temperature
 
Request body: 
 
 ```javascript
 {
   "temperature": 210, //degrees fahrenheit, an integer
   "type": "ambient" //optional, will default to 'ambient' if not provided
 }
 ```
 
 A valid request will just echo back in the response. The request will also be sent to the client via the socket for real time updates.
 
 