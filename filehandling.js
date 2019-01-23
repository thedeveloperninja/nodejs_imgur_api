const fs = require('fs');

//function to update the url list of uploaded files
function update_uploaded_urls(link) {

  let upload_data = require('./uploaded.json');
  let len = upload_data.uploaded.length;
  upload_data.uploaded[len] = link;
  let jsondata = JSON.stringify(upload_data, null, 2);
  fs.writeFileSync("uploaded.json", jsondata);
}

//function to create the status file with default values
function create_status_file(status_file,id,urls) {

  var datetime = new Date();
  var details = {
    id: id,
    created: datetime,
    finished: null,
    status: "in-progress",
    uploaded: {
      pending: urls,
      complete: [],
      failed: []
    }
  }
  var jsondata = JSON.stringify(details, null, 2);
  fs.writeFileSync(status_file, jsondata);
  console.log("status file created");
}

//fuction to update status file of specific job
function update_status_file(link, status_file, status) {

  var stat = require(status_file);
  if (status == 1) {

    var len = stat.uploaded.complete.length;
    stat.uploaded.complete[len] = link;
    stat.uploaded.pending.splice(0,1); //remove the first url from the pending urls
    var jsondata = JSON.stringify(stat, null, 2);
    fs.writeFileSync(status_file, jsondata);
    console.log("success url updated");
  } else if (status == 0) {

    var len = stat.uploaded.failed.length;
    stat.uploaded.failed[len] = link;
    stat.uploaded.pending.splice(0,1);
    var jsondata = JSON.stringify(stat, null, 2);
    fs.writeFileSync(status_file, jsondata);
    console.log("failed url updated");
  }

}

//after the job is completed
function job_complete(status_file){

  var data = require(status_file);
  data.finished = "true";
  data.status = "completed";
  var jsondata = JSON.stringify(data, null, 2);
  fs.writeFileSync(status_file, jsondata);
}


module.exports = {
  update_uploaded_urls: update_uploaded_urls,
  create_status_file: create_status_file,
  update_status_file: update_status_file,
  job_complete: job_complete
}
