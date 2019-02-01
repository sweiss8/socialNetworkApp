const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";



// Email validation

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Valid email is required'
    } 

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.'
    }

// Password validation


if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
} 




    return {
        errors,
        isValid: isEmpty(errors)
    };
};