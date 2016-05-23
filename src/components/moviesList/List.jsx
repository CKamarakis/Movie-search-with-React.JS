var React = require('react');
var ListItem = require('./ListItem.jsx');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var MoviesStore = require('../../store/movies-store.jsx');


var List = React.createClass({
     mixins: [Reflux.listenTo(MoviesStore, 'onChange')],

    getInitialState: function () {
        return {
            movies: []
        };
    },

    componentWillMount: function () {
        Actions.getMovies('rocky');
    },

    onChange: function(event, movies){
        this.setState({
            movies: movies
        });
    },

    render: function () {
        var createItem = function (movie, index) {
            return <ListItem key={index + movie.Title} movie={movie}/>;
        };
        return (
            <section id="movies-list" className="items-wrapper">
                {this.state.movies.map(createItem)}
                <div className="clearfix"></div>
            </section>
        )
    }
});

module.exports = List;