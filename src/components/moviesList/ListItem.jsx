var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


var ListItem = React.createClass({
    render: function () {
        var movie = this.props.movie;
        var movieLink = "/movie/" + movie.imdbID;

        return (
            <article className="item-box">
                <div className="item-box_img">
                    <Link to={movieLink}><img src={movie.Poster} title=""/></Link>
                </div>
                <div className="item-box_content">
                    <h2><Link to={movieLink}>{movie.Title}</Link></h2>
                    <ul className="info-tags">
                        <li>Year:&nbsp;<span>{movie.Year}</span></li>
                        <li>Type:&nbsp;<span>{movie.Type}</span></li>

                    </ul>
                    <Link className="more" to={movieLink}>Details</Link>
                </div>
                <div className="clearfix"></div>
            </article>
        );
    }
});


module.exports = ListItem;