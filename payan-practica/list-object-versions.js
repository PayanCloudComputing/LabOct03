const AWS = require('aws-sdk');
const S3 = new AWS.S3({apiVersion: '2006-03-01'});

var params = {
    Bucket: 'payan-versioning-bucket-11zkq2l4hl2vf'
}

module.exports.get = (event, context, callback) => {
    S3.listObjectVersions(params, function(err, data) {
        if (err) {
            callback(err);
        }
        else {
            objects = [];
            data.Versions.forEach(function(element) {
                objects.push({"Key": element.Key, "VersionId": element.VersionId, "LasModified": element.LastModified});
            }, this);
            callback(null, objects);
        }
    });
}