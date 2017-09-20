'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KatexOutput = function (_React$Component) {
    _inherits(KatexOutput, _React$Component);

    function KatexOutput(props) {
        _classCallCheck(this, KatexOutput);

        var _this = _possibleConstructorReturn(this, (KatexOutput.__proto__ || Object.getPrototypeOf(KatexOutput)).call(this, props));

        _this.timer = null;
        return _this;
    }

    _createClass(KatexOutput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.update();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var value = _ref.value;

            if (value !== this.props.value) {
                this.update();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(function () {
                _katex2.default.render(_this2.props.value, _this2.container, {
                    displayMode: _this2.props.displayMode
                });
            }, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement('div', {
                ref: function ref(container) {
                    _this3.container = container;
                },
                onClick: this.props.onClick
            });
        }
    }]);

    return KatexOutput;
}(_react2.default.Component);

KatexOutput.propTypes = {
    value: _propTypes2.default.string.isRequired,
    displayMode: _propTypes2.default.bool.isRequired,
    onClick: _propTypes2.default.func
};
KatexOutput.defaultProps = {
    onClick: function onClick() {}
};
exports.default = KatexOutput;