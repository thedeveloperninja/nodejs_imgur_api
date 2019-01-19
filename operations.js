const download = require('image-downloader');
const action = require('./actions');

//upload pictures
function upload_pics(req,res){

  res.send({
    "jobid":"6723828382828"
  });
  var url = req.body.urls;
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
