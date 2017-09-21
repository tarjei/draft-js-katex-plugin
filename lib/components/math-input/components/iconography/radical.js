"use strict";

/**
 * An autogenerated component that renders the RADICAL iconograpy in SVG.
 *
 * Generated with: https://gist.github.com/crm416/3c7abc88e520eaed72347af240b32590.
 */
var React = require('react');

var Radical = React.createClass({
    displayName: "Radical",

    propTypes: {
        color: React.PropTypes.string.isRequired
    },

    render: function render() {
        return React.createElement(
            "svg",
            { width: "48", height: "48", viewBox: "0 0 48 48" },
            React.createElement(
                "g",
                { fill: "none", fillRule: "evenodd" },
                React.createElement("path", { fill: "none", d: "M0 0h48v48H0z" }),
                React.createElement("path", {
                    d: "M13 16.997c0-.55.453-.997.997-.997h6.006c.55 0 .997.453.997.997v6.006c0 .55-.453.997-.997.997h-6.006c-.55 0-.997-.453-.997-.997v-6.006zM15 18h4v4h-4v-4z",
                    fill: this.props.color }),
                React.createElement("path", { stroke: this.props.color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round",
                    d: "M14 29l4 6 9-14h7" })
            )
        );
    }
});

module.exports = Radical;