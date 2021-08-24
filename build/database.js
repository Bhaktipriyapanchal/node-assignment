"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var username = "Bhakti";
var password = "HmztXu7eS4axPcsq";
var cluster = "cluster0.5pbic";
var dbname = "assignment";
var dbConnectString = "mongodb+srv://" + username + ":" + password + "@" + cluster + ".mongodb.net/" + dbname + "?retryWrites=true&w=majority";
exports.default = dbConnectString;
