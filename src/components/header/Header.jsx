var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
    render: function () {
        return (
            <section className="intro-section padding-20 section-separator">
                <h1 className="section-title"><Link to={'/'}>Search for movies</Link></h1>
                <p className="section-subtitle">Find everything about your favorite movies</p>
            </section>
        );
    }
});

module.exports = Header;
