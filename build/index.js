"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = __importDefault(require("./database"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var port = 3001;
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
// database connection
mongoose_1.default.connect(database_1.default, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", function () {
    console.log("Database Connected successfully");
});
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
