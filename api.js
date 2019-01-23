const express = require('express');
const router = express.Router();
const operation = require('./operations.js');

//get the url of all the uploaded images
router.get('/v1/images/', operation.list_url);

//get the details of  a specific job
router.get('/v1/images/upload/:jobid', operation.job_status);

//upload a new photo
router.post('/v1/images/upload', operation.upload_pics);

module.exports = router;
m
