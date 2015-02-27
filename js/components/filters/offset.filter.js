/**
 * @function offset
 * Returns a subset of array items from ng-repeat results. Input param is passed automatically by angular.
 * Start param is provided by developer. Array items indexed lower than start are cut off.
 * Closure function is used by angular to create a filter.
 * @param {object} input The array from ng-repeat
 * @param {number} start The starting point for which the sub set begins
 * @returns {Function}
 */
var offset = function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return (input) ? input.slice(start) : false;
    };
};