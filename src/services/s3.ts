import AWS from 'aws-sdk';
import fs from 'fs';
import config from '../config';

const s3 = new AWS.S3({
    accessKeyId: config.AWS_ID,
    secretAccessKey: config.AWS_SECRET
});

export const uploadFile = async (file: any) => {
    try {
        let fileData = await fs.readFileSync(file.path);
        // Setting up S3 upload parameters
        const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: file.filename,
            Body: fileData
        };
    
        // Uploading files to the bucket
        const data: any = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        return data;
    } catch (error) {
        
    }
}