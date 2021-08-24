import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const imagesSchema = new mongoose.Schema({
    coverImageUrl: { type: String },
    posterImageUrl: { type: String },
})

const movieSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    images: { 
        type: imagesSchema
    },
    genres: {
        type: String,
        required: true
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