var PeopleFactory = ['$http',function ($http) {
    return {
        load: function () {
            var _this = this;
            return $http.get('data/sample-data.json')
                .then(function(response){
                    _this.people = response.data;
                    _this.setStatesList();
                    return response.data;
                });
        },
        states : [],
        setStatesList: function(){
            var i;
            for (i = 0; i < this.people.length; i++) {
                if (this.states.indexOf(this.people[i].state) === -1) this.states.push(this.people[i].state);
            }

            this.states.sort();
        }
    };
}];