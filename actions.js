const download = require('image-downloader');
const imgur = require("imgur");

//function to download a image
function getimage(url,path){

  var options = {
    url: url,
    dest: path
  }
  download.image(options)
  .catch(function(err){
    console.log("invalid link : " + options.url);
  });
}

//function to upload to imgur
function upload_img(path){

  imgur.setClientId('c84e5ad7dfa88ba'); //replace with your own client id
  imgur.uploadFile(path)
      .then(function (json) {
          var status = json.status;
          var link = json.data.link;
          var success = json.success;
      })
      .catch(function (err) {
          console.error(err.message);
      });
}

//export the functions
module.exports = {
  get_image : getimage,
  upload_img : upload_img
}
