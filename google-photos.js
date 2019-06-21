const axios = require('axios');
const fs = require('fs');

const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g
const albumObj = {
  'album_name1': 'album_id',  //Ex: "slider": 'vMLmwTfANDMTPAgqxc'
  'album_name2': 'album_id'   //Ex: "home": 'MLbmwTsfANDMTPAgq3'
}

/**
 * extractPhotos function
 * @param { Array } content 
 */
function extractPhotos(content, add_quotes = true) {
 const links = new Set()
  let match
  while (match = regex.exec(content)) {
    (add_quotes) ? links.add(`"${match[1]}"`) : links.add(match[1]);
  }
  
  return Array.from(links)
}

/**
 * getPhotos function [ Reading an particular album photos and return it to client]
 * @param { String } id [Album Id]
 */
async function getPhotos(id) {
  try {
    const response = await axios.get(`https://photos.app.goo.gl/${id}`)
    return extractPhotos(response.data, false)
  } catch (error) {
    return null
  }
}

/**
 * getPhotos function
 */
function getPhotosFromFile() {
  Object.keys(albumObj).forEach(async function (module) {
    getAlbum(albumObj[module], module)
  });
}

/**
 * getAlbum function
 * @param { String || Integer } id 
 */
async function getAlbum(id, module = false) {
  try {
    const response = await axios.get(`https://photos.app.goo.gl/${id}`)
    const res = extractPhotos(response.data);
    writeGPhotosPathInFile(res, module)
  } catch(e) {
    return null
  }
}

/**
 * jsonIsEmpty function
 * @param { Object } obj 
 */
function jsonIsEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

/**
 * writeGPhotosPathInFile functions
 * @param { Array } content 
 * @param { String } module 
 */
function writeGPhotosPathInFile(content, module) {
  fs.readFile(`${__dirname}/g-photos/g-photos.json`, 'utf8', function readFileCallback(err, data){
    if (!err) {
      obj = JSON.parse(data); //now it an object
      
      if (!jsonIsEmpty(obj) && eval(`obj.${module}`)) {
        if(content.length !== eval(`obj.${module}.length`)) {
          eval(`obj.${module} = [${content}]`)
        }
      } else {
        eval(`obj.${module} = [${content}]`)
      }

      json = JSON.stringify(obj, null, 2); //convert it back to json
      fs.writeFile(`${__dirname}/g-photos/g-photos.json`, json, 'utf8', () => {});

      if (Object.keys(albumObj)[Object.keys(albumObj).length - 1] === module) {
        console.log('\x1b[32m', 'Successfully synced album urls in ./g-photos/g-photos.json file')
      }
    }
  });
}

module.exports = {
  getPhotos,
  getPhotosFromFile
}
