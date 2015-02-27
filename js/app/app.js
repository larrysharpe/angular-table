'use strict';
/**
 *  Setup the Angular Contact App Module
 *  Module is made of:
 *  2 Filters (offset and ascDesc)
 *  Contact Table Directive
 *  App Controller
 */
angular.module('contactAppMod',[])
.value('config', config)
.filter('offset', offset)
.filter('ascDesc', ascDesc)
.directive('contactsTable',ContactsTable)
.factory('People',PeopleFactory )
.controller('appCtrl',HomeCtrl);
