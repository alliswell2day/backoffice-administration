'use strict';
var path = require('path'),
    db = require(path.resolve('./config/lib/sequelize')),
    models = db.models,
    response = require(path.resolve("./config/responses.js"));


//RETURNS http headers in json object format

exports.product_list = function(req, res) {
    models.combo.findAll({
        attributes: ['id', 'name', 'duration'], where: {isavailable: true}, order: [['name', 'ASC']]
    }).then(function (product_list) {
        response.send_res(req, res, product_list, 200, 1, 'OK_DESCRIPTION', 'OK_DATA', 'private,max-age=86400');
    }).catch(function(error) {
        response.send_res(req, res, [], 706, -1, 'DATABASE_ERROR_DESCRIPTION', 'DATABASE_ERROR_DATA', 'no-store');
    });
};