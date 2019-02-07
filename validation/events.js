const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateEventsInput(data) {
    let errors = {};

    data.date = !isEmpty(data.date) ? data.date : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.locationorfield = !isEmpty(data.locationorfield) ? data.locationorfield : "";
    data.division = !isEmpty(data.division) ? data.division : "";




if(Validator.isEmpty(data.date)) {
    errors.date = 'Date is required'
} 

if(Validator.isEmpty(data.type)) {
    errors.type = 'Event type (practice or tournament) is required'
} 

if(Validator.isEmpty(data.locationorfield)) {
    errors.locationorfield = 'Location/Field is required'
} 

if(Validator.isEmpty(data.division)) {
    errors.division = 'Division is required'
} 




    return {
        errors,
        isValid: isEmpty(errors)
    };
};