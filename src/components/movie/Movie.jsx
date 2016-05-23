var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var MoviesStore = require('../../store/movies-store.jsx');;

var Movie = React.createClass({
    mixins: [Reflux.listenTo(MoviesStore, 'onChange')],

    getInitialState: function () {
        return {
            pid: "",
            movieData: []
        };
    },

    componentDidMount: function () {
        this.setState({mid: this.props.params.movieId});

    },

    componentWillMount: function () {
        Actions.getSingleMovie(this.props.params.movieId);
    },

    onChange: function (event, movieData) {
        this.setState({
            movieData: movieData
        });
    },



    render: function () {
        var movie = this.state.movieData;
        return (
            <section className="movie single-wrap">
               <section className="main-info">
                   <img src={movie.Poster} alt={movie.Title}/>
                   <h2>{movie.Title}</h2>
                   <p>{movie.Plot}</p>
                   <div className="clearfix"></div>
               </section>
                <section className="movie_info">
                    <p>Director:&nbsp;<span>{movie.Director}</span></p>
                    <p>Writer(s):&nbsp;<span>{movie.Writer}</span></p>
                    <p>Actors:&nbsp;<span>{movie.Actors}</span></p>
                    <p>Released:&nbsp;<span>{movie.Released}</span></p>
                    <p>Awards:&nbsp;<span>{movie.Awards}</span></p>
                    <div className="clearfix"></div>
                </section>
                <section className="movie_tags">
                    <ul className="info-tags">
                        <li>Year:&nbsp;<span>{movie.Year}</span></li>
                        <li>Genre:&nbsp;<span>{movie.Genre}</span></li>
                        <li>IMDB:&nbsp;<span>{movie.imdbRating}</span></li>
                        <li>Type:&nbsp;<span>{movie.Type}</span></li>
                    </ul>
                    <div className="clearfix"></div>
                </section>
            </section>
        );
    }
});

module.exports = Movie;
