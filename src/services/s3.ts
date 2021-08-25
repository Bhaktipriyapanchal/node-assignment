import AWS from 'aws-sdk';
import fs from 'fs';
import Config from '../models/config';

export const uploadFile = async (file: any) => {
    try {
        const config: any = await Config.findOne({});
        if (config && config.aws) {
            const s3 = new AWS.S3({
                accessKeyId: config.aws.id,
                secretAccessKey: config.aws.secret
            });

            let fileData = await fs.readFileSync(file.path);
            // Setting up S3 upload parameters
            const params = {
                Bucket: config.aws.bucketName,
                Key: file.filename,
                Body: fileData
            };
        
            // Uploading files to the bucket
            const data: any = await s3.upload(params).promise();
            console.log(`File uploaded successfully. ${data.Location}`);
            return data;
        }
    } catch (error) {
        
    }
}