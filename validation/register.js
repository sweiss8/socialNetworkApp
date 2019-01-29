const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


// First Name validation
    if(!Validator.isLength(data.firstName, { min: 2, max: 30 })){
        errors.firstName = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required'
    }

// Last Name validation
    if(!Validator.isLength(data.lastName, { min: 2, max: 30 })){
        errors.lastName = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required'
    }

// Email validation

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Valid email is required'
    } 

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.'
    }


// Password validation

if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password = 'Password must be at least 6 characters';
}

if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
} 

if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required'
} 

if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
} 


    return {
        errors,
        isValid: isEmpty(errors)
    };
};