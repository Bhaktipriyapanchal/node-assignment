import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const imagesSchema = new mongoose.Schema({
    coverImageUrl: { type: String, trim: true },
    posterImageUrl: { type: String, trim: true },
})

const movieSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    duration: { // in minutes
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        trim: true
    },
    images: { 
        type: imagesSchema
    },
    genres: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date     
    },
    modifiedAt: {
        type: Date    
    }
});

movieSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: true
})

movieSchema.pre('save', function(next) {
    this.createdAt = new Date();
    return next();
});

movieSchema.pre('update', function(next) {
    this.update({}, { modifiedAt: new Date() }, { overwrite: true })
    this.setOptions({ overwrite: false })
    return next();
});

movieSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { modifiedAt: new Date() }, { overwrite: true })
    this.setOptions({ overwrite: false })
    return next();
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;