/**
 * @function ascDesc
 * Returns 'Asc' or 'Desc' string if the input param is exactly false or true respectively.
 * Closure function is used by angular to create a filter.
 * @param {boolean} input
 * @returns {Function}
 */
var ascDesc = function(){
    return function (input){
        if(input === true) return 'Desc';
        if(input === false) return 'Asc';
        return '';
    };
};
