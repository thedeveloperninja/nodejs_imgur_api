const download = require('image-downloader');

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

//export the functions

module.exports = {
  get_image : getimage
}
