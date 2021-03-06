import Movie from '../models/movie';
import { uploadFile } from '../services/s3';
import logger from '../services/logger';

export default {
    // get list of movies - accepts limit, offset, search query params
    list: async (req: any, res: any) => {
        try {
            const { query } = req;
            let limit = +query.limit || 5;
            let offset = +query.offset || 0;
            let search = {};

            if (query.search && query.search.length) {
                search = {
                    $or: [
                        { title: { $regex: new RegExp(decodeURIComponent(query.search)), $options: 'i' } },
                        { genres: { $regex: new RegExp(decodeURIComponent(query.search)), $options: 'i' } },
                    ]
                }                
            }
            
            const movies = await Movie.find(search).limit(limit).skip(offset);
            const count = await Movie.countDocuments();
            return res.status(200).send({ status: 200, success: true, data: movies, count });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // add new movie
    create: async (req: any, res: any) => {
        try {
            req.body.releaseDate = new Date(req.body.releaseDate);
            req.body.createdAt = new Date();
            const movie = new Movie(req.body);
            const result = await movie.save();
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // get movie by id
    get: async (req: any, res: any) => {
        try {
            const movie = await Movie.findById(req.params.id);
            return res.status(200).send({ status: 200, success: true, data: movie });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // update movie by id
    update: async (req: any, res: any) => {
        try {
            delete req.body._id;
            const result = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // delete movie by id
    delete: async (req: any, res: any) => {
        try {
            const movie: any = await Movie.findById(req.params.id);
            const result = await movie.delete();
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // add multiple movies
    createMany: async (req: any, res: any) => {
        try {
            if (req.body.values && req.body.values.length) {
                req.body.values.map(async (data: any) => {
                    data.createdAt = new Date();
                    data.releaseDate = new Date(data.releaseDate);
                    const movie = new Movie(data);
                    await movie.save();
                })
                return res.status(200).send({ status: 200, success: true, message: 'Movies added!' });
            }
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // upload image to aws
    upload: async (req: any, res: any) => {
        try {
            let result = await uploadFile(req.file);
            return res.status(200).send({ status: 200, success: true, data: result });            
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });            
        }
    }
}