"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movie_1 = __importDefault(require("./api/movie"));
var Router = express_1.default.Router;
var router = Router();
router.get('/movies', movie_1.default.list);
router.post('/movie', movie_1.default.create);
router.get('/movie/:id', movie_1.default.get);
router.put('/movie/:id', movie_1.default.update);
router.delete('/movie/:id', movie_1.default.delete);
router.post('/movies', movie_1.default.createMany);
exports.default = router;
