// init project
const express = require('express');
const app = express();
const { getPhotos, getPhotosFromFile } = require('./google-photos')
const CronJob = require('cron').CronJob;
const port = 3002;

// authorize CORS (for demo only)
app.use(function(req, res, next) {
  const origin = req.headers.origin;
  if(origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// reading specific album records/photos
app.get('/get-one-album-urls/:id', async function(request, response) {
  try {
    const results = await getPhotos(request.params.id)
    return response.json(results);
  } catch(e) {
    response.status(500)
  }
});

// reading given all album records/photos from file. File path is => (g-photos/g-photos.json)
app.get('/get-all-album-urls', function(request, response) {
  try {
    const GPhotos = require('./g-photos/g-photos.json');
    if (GPhotos) return response.json(GPhotos)
  } catch(e) {
    response.status(500)
  }
});

app.listen(port, function() {
  console.log('Your app is listening on port http://localhost:' + port);
});

// Job for fetching data from google album Will sync photos every day at 9:30
new CronJob('00 30 9 * * *', async () => {
  await getPhotosFromFile();
}, null, true, 'Asia/Kolkata'); //null, true, 'timezone' Ex: "Asia/Kolkata"