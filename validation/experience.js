const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.team  = !isEmpty(data.team) ? data.team : "";
    data.from = !isEmpty(data.from) ? data.from : "";




if(Validator.isEmpty(data.title)) {
    errors.team = 'Team is required'
} 

if(Validator.isEmpty(data.from)) {
    errors.from = 'From date field  is required'
} 




    return {
        errors,
        isValid: isEmpty(errors)
    };
};