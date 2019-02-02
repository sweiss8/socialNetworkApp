// Checks for undefined, null, empty object, empty string, as opposed to Validator's "isEmpty" that only checks for an empty string.

const isEmpty = (value) => 
        value === undefined || 
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);
    
export default isEmpty;

// same as our isEmpty validation on the back end