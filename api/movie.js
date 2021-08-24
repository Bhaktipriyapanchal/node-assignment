import Movie from '../models/movie';

export default {
    list: async ({ query }, res) => {
        try {
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
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    create: async (req, res) => {
        try {
            req.body.releaseDate = new Date(req.body.releaseDate);
            const movie = new Movie(req.body);
            const result = await movie.save();
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    get: async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            return res.status(200).send({ status: 200, success: true, data: movie });
        } catch (error) {
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    update: async (req, res) => {
        try {
            delete req.body._id;
            const result = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    delete: async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            const result = await movie.delete();
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    restore: async (req, res) => {
        try {
            await Movie.restore({_id: req.params.id});
            const movie = await Movie.findById(req.params.id);
            return res.status(200).send({ status: 200, success: true, data: movie });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}