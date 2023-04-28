const db = require('../config/db.config');
const { getAll, getById } = require('../database/queries');
const { logger } = require('../utils/logger');

class Data {
    constructor (Columna1, Columna2){
        this.Columna1=Columna1;
        this.Columna2=Columna2;
    }

    static getAll(cb) {
        db.query(getAll, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static getById(Id, cb) {
        db.query(getById, Id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = Data;