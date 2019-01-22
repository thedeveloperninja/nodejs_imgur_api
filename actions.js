const download = require('image-downloader');
const imgur = require('imgur');
var uploaded = require('./uploaded.json');
const fs = require('fs');
var upload_data = require('./uploaded.json');
imgur.setClientId('c84e5ad7dfa88ba'); //set api client

async function download_upload(urls, path, index) {

  await download_img(urls, path, index);
  await upload_img(path);
  index = index + 1;
  if (index < urls.length) {
    download_upload(urls, path, index);
  }
}

//function to download a image from a link
async function download_img(urls, path, index) {

  var option = {
    url: urls[index],
    dest: path
  };
  await download.image(option)
    .then(
      function() {
        console.log("image downloaded");
      }
    )
    .catch(
      function(err) {
        console.error(err.message);
      }
    );
}

//function to upload a image in imgur
async function upload_img(path) {

  await imgur.uploadFile(path)
    .then(
      function(json) {
        console.log(json.data.link);
        var len = upload_data.uploaded.length;
        upload_data.uploaded[len] = json.data.link;
        var jsondata = JSON.stringify(upload_data, null, 2);
        fs.writeFileSync("uploaded.json", jsondata);
      })
    .catch(
      function(err) {
        console.error(err.message);
      }
    );
}

//export the function
module.exports = {
  download_upload: download_upload
}
