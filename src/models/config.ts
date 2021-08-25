import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const awsSchema = new mongoose.Schema({
    id: { type: String, trim: true },
    secret: { type: String, trim: true },
    bucketName: { type: String, trim: true },
})

const configSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    aws: {
        type: awsSchema
    },    
    createdAt: {
        type: Date     
    },
    modifiedAt: {
        type: Date    
    }
});

const Config = mongoose.model('Config', configSchema);

export default Config;