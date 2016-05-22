var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');
var HTTP = require('../services/httpservice');
var baseUrl = 'http://www.omdbapi.com/';

var MoviesStore = Reflux.createStore({
    listenables: [Actions],

    getMovies: function (text) {
        HTTP.get(baseUrl + '?r=json&s=' + text)
            .then(function (json) {
                //console.log(json.Search);
                this.movies = json.Search;
                this.triggerMoviesUpdate();
            }.bind(this));


    },

    getSingleMovie: function (id) {
        HTTP.get(baseUrl + '?plot=full&r=json&i=' + id)
            .then(function (json) {
                this.movie = json;
            }.bind(this));
    },

    triggerMoviesUpdate: function () {
        this.trigger('change', this.movies);
    }

});

module.exports = MoviesStore;