const action = require('./actions');
const uuid = require('uuid/v1')
var datastore = require('./data_file.json');
var uploaded = require('./uploaded.json');

function upload_pics(req, res) {

  var urls = req.body.urls;
  var id = uuid();
  var path = './images/' + id + '.jpg';
  action.download_upload(urls, path, 0);
  res.send({
    "jobid": id
  });
}

function job_status(req, res) {

  var id = req.params.jobid;
  console.log(id);
  res.end();
}

function list_url(req, res) {

  res.json(uploaded);
  res.end();
}

// exporting the functions
module.exports = {
  upload_pics: upload_pics,
  list_url: list_url,
  job_status: job_status
}
