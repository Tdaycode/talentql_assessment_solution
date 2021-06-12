const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');
const User = require('../../../models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
    _id: mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(), 
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.phoneNumber(),
    password: 'password1',
    role: 'user',
};

const userTwo = {
    _id: mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(), 
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.phoneNumber(),
    password: 'password1',
    role: 'user',
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  insertUsers
};
