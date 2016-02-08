'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
const validateLocalStrategyProperty = function validateLocalStrategyProperty(property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function validateLocalStrategyPassword(password) {
  return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
const UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name'],
  },
  last_name: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name'],
  },
  display_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer'],
  },
  salt: {
    type: String,
  },
  provider: {
    type: String,
    default: 'local',
    required: 'Provider is required',
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['general', 'admin', 'dev'],
    }],
    default: ['general'],
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  /* For reset password */
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', (next) => {
  if (this.password && this.password.length >= 8) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = (password) => {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  }

  return password;
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = (password) => this.password === this.hashPassword(password);

mongoose.model('User', UserSchema);
