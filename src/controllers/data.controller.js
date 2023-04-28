const Data = require('../models/data.model');
const { logger } = require('./../utils/logger');

exports.getall = (req, res) => {

    Data.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
    
};

exports.getbyid = (req, res) => {
    // logger.log(req.params.id);
    Data.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
    
};