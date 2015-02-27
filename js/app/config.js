// A config object for some initial values in the app
var config = {
    currentPage: 1,
    headers:[
        {name: 'last_name', label: 'Last Name'},
        {name: 'first_name', label: 'First Name'},
        {name: 'join_date', label: 'Join Date', class: 'hide-small'},
        {name: 'email', label: 'Email', class: 'hide-small'},
        {name: 'phone', label: 'Phone', class: 'hide-small'},
        {name: 'address', label: 'Address', class: 'hide-small'},
        {name: 'city', label: 'City', class: 'hide-small'},
        {name: 'state', label: 'State', class: "text-center"},
        {name: 'zip', label: 'Zip', class: 'hide-small'}
    ],
    perPage: 10,
    perPageOptions: [10, 20, 50]
};