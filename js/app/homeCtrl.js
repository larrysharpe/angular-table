'use strict';

/**
 * @function HomeCtrl
 * The controller for the whole app. Depends on $scope as well as the config and People providers.
 *
 */
var HomeCtrl = ['$scope', 'config', 'People', '$window', function ($scope, config, People, $window){

    // combine config properties with the scope
    angular.extend($scope, config);

    $scope.mobile = $window.innerWidth < 400;

    angular.element($window).bind('resize', function () {
        $scope.mobile = $window.innerWidth < 400;
        $scope.setPageNumbers();
        console.log('resize', $scope.mobile);
    });

    $scope.matchCase = true;

    //Async call to load the people data
    People.load().then(function(data) {
        $scope.people = data;
        $scope.states = People.states;
        $scope.setPageNumbers();
    });

    /**
     * @function canNextPage
     * Checks to see if there is a next page by checking if the currentPage is lower than the total pages
     * Used to enable / disable the next page button in pagination
     * @returns {boolean}
     */
    $scope.canNextPage = function () {
        return $scope.currentPage < $scope.totalPages();
    };

    /**
     * @function canPrevPage
     * Checks to see if there is a previous page by checking if the currentPage is higher than 1
     * Used to enable / disable the prev page button in pagination
     * @returns {boolean}
     */
    $scope.canPrevPage = function (){
        return $scope.currentPage > 1;
    };

    $scope.details = function (index){
        $scope.selected = $scope.filtered[index];
    };

    /**
     * @function isCurrentPage
     * Checks to see if there is a provided page number matches the current page
     * Used to set the page numbers to active in pagination
     * @returns {boolean}
     */
    $scope.isCurrentPage = function (page) {
        return $scope.currentPage === page;
    };

    /**
     * @function isSortedPage
     * Checks to see if the table is sorted by a column
     * Used to set the page numbers to active in pagination
     * @returns {boolean}
     */
    $scope.isSorted = function (column, reversed) {
        return $scope.orderBy === column && $scope.reverse === reversed;
    };

    /**
     * @function nextPage
     * Increments the current page by one if that is not beyond the last page
     * if mobile mode recreate the page numbers
     */
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.totalPages()) $scope.currentPage++;
        if ($scope.mobile) $scope.setPageNumbers();
    };

    /**
     * @function offset
     * Returns the first row index ofthe current page
     * @returns {number}
     */
    $scope.offset = function (){
        return ($scope.currentPage - 1) * $scope.perPage;
    };

    /**
     * @function orderList
     * Check to see if the table is ordered by a provided field if so it toggles the direction between ASC and DESC
     * if not it sets the order to that field in ASC direction
     */
    $scope.orderList = function(field){
        if($scope.orderBy === field ) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.orderBy = field;
            $scope.reverse = false;
        }
    };

    /**
     * @function limit
     * Returns the last row index of the current page
     * @returns {number}
     */
    $scope.limit = function(){
        return $scope.offset() + $scope.perPage;
    };

    /**
     * @function prevPage
     * Decrements the current page by one if that is not beyond the first page
     * if mobile mode recreate the page numbers
     */
    $scope.prevPage = function() {
        if ($scope.currentPage > 1) $scope.currentPage--;
        if ($scope.mobile) $scope.setPageNumbers();
    };

    /**
     * @function reset
     * Clears out the values for searchtext an searchstate
     */
    $scope.reset = function () {
        $scope.searchStates = null;
        $scope.searchText = null;
    };

    /**
     * @function search
     * limits the table results to entries provided in the search text box or state select box
     * By default is NOT case sensitive but can be made so by setting $scope.matchCase to true
     * The first_name and last_name fields are searched when text is entered.
     * The state field is searched when the state select drop down is used.
     */
    $scope.search = function(row){
        var fname = row.first_name,
            lname = row.last_name,
            searchText = $scope.searchText || '';

        if(!$scope.matchCase){
            fname = fname.toLowerCase();
            lname = lname.toLowerCase();
            searchText = searchText.toLowerCase();
        }

        return (

            (fname.indexOf(searchText) != -1) ||  // is searchText found in fname?
            (lname.indexOf(searchText) != -1)     // is searchText found in lname?
            ) &&
            (
            !$scope.searchStates ||               // is there no searchStates
            (row.state.indexOf($scope.searchStates ) != -1)  // is searchState found in states
            );
    };

    /**
     * @function setPage
     * Sets currentPage to provided page
     * if mobile mode recreate the page numbers
     */
    $scope.setPage = function (page){
        $scope.currentPage = page;
        if ($scope.mobile) $scope.setPageNumbers();
    };

    /**
     * @function setPageNumbers
     * Creates an array which is used to display the page buttons in pagination
     * If mobile, the number of page buttons is limited to 3 which requires more button drawing when changing pages
     */
    $scope.setPageNumbers = function(){
        var i,
            mobilePageNumbers = 3,
            pageStart = $scope.currentPage;
        $scope.pageNumbers = [];

        if ($scope.currentPage > $scope.totalPages()) $scope.currentPage = $scope.totalPages();

        if (!$scope.mobile) {
            for (i = 0; i < $scope.totalPages(); i++) $scope.pageNumbers.push(i + 1);
        } else {
            /* In mobile mode, only 3 page number buttons are shown.
               we must first determine which 3 they are
            */
            if ($scope.currentPage === $scope.totalPages()){
                pageStart = $scope.currentPage - 2;
            } else if ($scope.currentPage != 1) {
                pageStart = $scope.currentPage - 1;
            }

            // assign the page numbers to the pageNumbes array
            for(i=0;i<mobilePageNumbers;i++){
                $scope.pageNumbers.push(pageStart + i);
            }
        }

    };

    /**
     * @function totalPages
     * Returns how many pages there are for the matched data set
     * Search items (searchText and searchState) are used to filter the data,
     * the results of that search are saved to a new array called filtered,
     * filtered is what the pagination is based upon
     * @returns {number}
     */
    $scope.totalPages = function(){
        if ($scope.people) {   //make sure the people data is loaded
            var totalSource = ($scope.filtered) ? $scope.filtered.length : $scope.people.length;
            return Math.ceil(totalSource / $scope.perPage);
        }
    };
}];