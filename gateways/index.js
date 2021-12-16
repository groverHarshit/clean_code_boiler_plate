const create = require('./create')
const update = require('./update')
const read = require('./read')
const list = require('./list')
const Delete = require('./delete')
const aggregate = require('./aggregate');
const getByFeild = require('./readByFeild')
const deleteByFeild = require('./deleteByFeild')

const gateway = (model) =>
  Object.freeze({
    create: new create(model).execute,
    read: new read(model).execute,
    update: new update(model).execute,
    delete: new Delete(model).execute,
    list: new list(model).execute,
    aggregate: new aggregate(model).execute,
    getByFeild: new getByFeild(model).execute,
    deleteByFeild: new deleteByFeild(model).execute,
  });

module.exports = () => {
  const userModel = require("../models/users.model");
  const pumpModel = require("../models/pump.model");
  const bookingModel = require("../models/bookings.model");

  return Object.freeze({
    userGateway: gateway(userModel),
    pumpGateway: gateway(pumpModel),
    bookingGateway: gateway(bookingModel),
  });
};
