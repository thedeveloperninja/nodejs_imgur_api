const download = require('image-downloader');
const action = require('./actions');
const uuid = require('uuid/v1')

//upload pictures to imgur
function upload_pics(req,res){

  var url = req.body.urls;
  //generate a unique job id
  var id = uuid();
  //send a unique job id as response
  res.send({
    "jobid":uuid()
  });
  //download each image and upload it in imgur
  for (var link of url){
    action.get_image(link,'./images/');
  }
}

//list all the uploaded urls
function list_url(req,res){

}

//get the status of a job
function job_status(req,res){

  var id = req.params.jobid;
  console.log(id);
  res.end();
}

// exporting the functions
module.exports = {
  upload_pics : upload_pics,
  list_url : list_url,
  job_status : job_status
}
