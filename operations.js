const action = require('./actions');
const uuid = require('uuid/v1');

// create a job id and upload the images
function upload_pics(req, res) {

  var urls = req.body.urls;
  var id = uuid();
  action.download_upload(urls, id, 0);
  res.json({
    "jobid": id
  });
  res.end();
}

// get the status of the given jobid
function job_status(req, res) {

  var id = req.params.jobid;
  //console.log(id);
  var status_file = './data/' + id + '.json';
  var status = require(status_file);
  res.json(status);
  res.end();
}

// get the list of urls of all uploaded images
function list_url(req, res) {
  var uploaded = require('./uploaded.json');
  res.json(uploaded);
  res.end();
}

// exporting the functions
module.exports = {
  upload_pics: upload_pics,
  list_url: list_url,
  job_status: job_status
}
