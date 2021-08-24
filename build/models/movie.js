"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_delete_1 = __importDefault(require("mongoose-delete"));
var imagesSchema = new mongoose_1.default.Schema({
    coverImageUrl: { type: String, trim: true },
    posterImageUrl: { type: String, trim: true },
});
var movieSchema = new mongoose_1.default.Schema({
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
    duration: {
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
movieSchema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    overrideMethods: true
});
movieSchema.pre('update', function (next) {
    this.update({}, { modifiedAt: new Date() }, { overwrite: true });
    this.setOptions({ overwrite: false });
    return next();
});
movieSchema.pre('findOneAndUpdate', function (next) {
    this.update({}, { modifiedAt: new Date() }, { overwrite: true });
    this.setOptions({ overwrite: false });
    return next();
});
var Movie = mongoose_1.default.model('Movie', movieSchema);
exports.default = Movie;
