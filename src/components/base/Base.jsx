var React = require('react');
var Header = require('../header/Header.jsx');

var Base = React.createClass({
    render: function () {
        return (
            <section className="content-wrapper">
                <Header/>
                {this.props.children}
            </section>
        );
    }
});

module.exports = Base;
