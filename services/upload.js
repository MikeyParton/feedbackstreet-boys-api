const multer = require('multer');
const uuid = require('uuid/v4');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'feedbackstreet-boys',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${uuid()}-${file.originalname}.${file.mimetype.split('/')[1]}`)
    }
  })
})

module.exports = upload;
