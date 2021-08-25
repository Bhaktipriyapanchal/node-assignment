import Config from '../models/config';
import logger from '../services/logger';

export default {
    // get config
    get: async (req: any, res: any) => {
        try {            
            const config = await Config.findOne({});
            return res.status(200).send({ status: 200, success: true, data: config });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    },

    // add/update config
    create: async (req: any, res: any) => {
        try {
            let config: any = await Config.findOne({});
            let result: any = {};
            if (config) {
               config = Object.assign(config, req.body) 
               result = await Config.findByIdAndUpdate(config._id, req.body, { new: true });
            } else {
                config = new Config(req.body);
                result = await config.save();
            }
            return res.status(200).send({ status: 200, success: true, data: result });
        } catch (error) {
            logger.log({level: 'error', message: JSON.stringify(error)});
            return res.status(500).send({ status: 500, isError: true, error: error, data: [] });
        }
    }
}