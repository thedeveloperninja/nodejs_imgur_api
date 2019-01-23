const download = require('image-downloader');
const imgur = require('imgur')
const f = require('./filehandling')

imgur.setClientId('c84e5ad7dfa88ba'); //set your own api client id

async function download_upload(urls, id, index) {
  var img_path = './data/' + id + '.jpg';
  var status_file = './data/' + id + '.json';
  if (index == 0) {
    await f.create_status_file(status_file, id, urls);
  }
  await download_img(urls, img_path, status_file, index);
  //await upload_img(urls, img_path, status_file, index);
  index = index + 1;
  if (index < urls.length) {
    download_upload(urls, id, index);
  } else if (index = urls.length) {
    f.job_complete(status_file);
  }
}

//function to download a image from a link
async function download_img(urls, img_path, status_file, index) {

  var option = {
    url: urls[index],
    dest: img_path
  };
  await download.image(option)
    .then(
    async function() {
        console.log("image downloaded :" + (index + 1));
        await upload_img(urls, img_path, status_file, index);
      }
    )
    .catch(
    async  function(err) {
        //console.error(err.message);
        await f.update_status_file(urls[index], status_file, 0);
      }
    );
}

//function to upload a image in imgur
async function upload_img(urls, img_path, status_file, index) {

  await imgur.uploadFile(img_path)
    .then(
      function(json) {
        console.log(json.data.link);
        f.update_uploaded_urls(json.data.link);
        f.update_status_file(json.data.link, status_file, 1);
      })
    .catch(
      function(err) {
        console.error(err.message);
        f.update_status_file(urls[index], status_file, 0);
      }
    );
}


//export the function
module.exports = {
  download_upload: download_upload
}
