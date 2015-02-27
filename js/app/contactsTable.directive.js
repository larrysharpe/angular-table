/**
 * @function contactsTable
 * Is the function for the 'contactsTable' directive
 * Loads the table markup and restricts the directive initialization to elements only
 */
var ContactsTable = function () {
    return {
        restrict: 'E',
        templateUrl: 'js/app/contactsTable.html'
    };
};