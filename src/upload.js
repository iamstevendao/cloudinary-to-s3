import AWS from 'aws-sdk';

require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * @summary Upload a document to s3
 *
 * @param {String} file
 * @param {String} path
 * @param {String} [fileName]
 */
export function upload({
  file, path, fileName = '', contentType,
}) {
  // Generate new path with random 10 characters
  const filePath = path || `docs/${(+new Date()).toString(36).slice(-10)}`;

  const Key = `${filePath}/${fileName}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, Key, Body: file, ContentType: contentType,
  };
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve({
        fileName,
        fileId: `${filePath}/${fileName}`,
        fileUrl: `${process.env.AWS_S3_ENDPOINT}${filePath}/${fileName}`,
      });
    });
  });
}
