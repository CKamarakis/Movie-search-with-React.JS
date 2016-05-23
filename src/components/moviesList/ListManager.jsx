var React = require('react');
var List = require('./List.jsx');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var MoviesStore = require('../../store/movies-store.jsx');

var ListManager = React.createClass({
    mixins: [Reflux.listenTo(MoviesStore, 'onChange')],

    getInitialState: function () {
        return {
            movies: [],
            newItemText: '',
        }
    },

    componentDidMount: function () {
        this.setState({
            movies: [],
            newItemText: '',
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var currentItems = this.state.movies;

        Actions.getMovies(this.state.newItemText);

        this.setState({newItemText: ''});
    },

    onTextChange: function (e) {
        this.setState({
            newItemText: e.target.value,
        });
    },

    onChange: function (e, movies) {
        this.setState({
            movies: movies
        });
    },


    render: function () {

        return (
            <section id="movies-search">
                <section className="form-section section-separator">
                    <form className="inline-form" onSubmit={this.handleSubmit}>
                        <div className="search-input">
                            <input onChange={this.onTextChange} type="text" value={this.state.newItemText}
                                   placeholder="Rocky, Rambo, Star Wars etc"/>
                            <span className="lens"><span></span></span>
                        </div>
                        <button>Search</button>
                    </form>
                    <div className="clearfix"></div>
                </section>
                <div className="clearfix"></div>
                <List movies={this.state.movies}/>
            </section>
        );
    }


});

module.exports = ListManager