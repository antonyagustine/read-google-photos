### Read public photos from google album

######Download the package first and follow the steps.
> - Go to google-photos folder and run `npm install`.

##### Runing this app
> - Go to google-photos folder and run `npm start` or `node server.js`
> - Otherewise you can install `node PM2` to run it. You can find [PM2 Installation](https://www.npmjs.com/package/pm2) here.
> - Then Go to google-photos folder and run `pm2 start server.js` in cmd/Terminal

##### Routes:
> * method: `GET`, route: `/get-one-album-urls/<id>`, Respons: `array[] of URLs`
> * method: `GET`, route: `/get-all-album-urls`, Respons: `array[] of URLs`.

Run command in terminal/cmd on google-photos folder to sync photos manually in your g-photos.json file.
> `node -e 'require("./google-photos").getPhotosFromFile()'`


#####Examples:
###### Using Axios
- URL /get-one-album-urls
> axios.get(`http://localhost:3002/get-one-album-urls/${id}`)
- URL /get-all-album-urls
> axios.get(`http://localhost:3002/get-all-album-urls`)
###### Using fetch method.
- URL /get-one-album-urls
> fetch(`http://localhost:3002/get-one-album-urls/${id}`) //Replace album id in the url
&nbsp;&nbsp;.then(
&nbsp;&nbsp;&nbsp;&nbsp;function(response) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (response.status !== 200) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('Looks like there was a problem. Status Code: ' + response.status);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Examine the text in the response
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response.json().then(function(data) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(data);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;)
.catch(function(err) {
&nbsp;&nbsp;console.log('Fetch Error :-S', err);
});
- URL /get-all-album-urls
> fetch(`http://localhost:3002/get-all-album-urls`)
&nbsp;&nbsp;.then(
&nbsp;&nbsp;&nbsp;&nbsp;function(response) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (response.status !== 200) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('Looks like there was a problem. Status Code: ' + response.status);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Examine the text in the response
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response.json().then(function(data) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(data);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;)
.catch(function(err) {
&nbsp;&nbsp;console.log('Fetch Error :-S', err);
});

#### Contact us on [processdrive.com](http://processdrive.com)