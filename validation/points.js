const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.result = !isEmpty(data.result) ? data.result : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";




    if(Validator.isEmpty(data.result)) {
        errors.result = 'Result field is required.'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};