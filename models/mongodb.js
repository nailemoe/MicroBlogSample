var setting = require('../setting');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var connection = mongodb.Connection;
var Server = mongodb.Server;

module.exports = new Db(setting.db, new Server(setting.host, setting.port, {}));
