'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _insertTeXBlock = require('../modifiers/insertTeXBlock');

var _insertTeXBlock2 = _interopRequireDefault(_insertTeXBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InsertKatexButton = function (_Component) {
  _inherits(InsertKatexButton, _Component);

  function InsertKatexButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InsertKatexButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InsertKatexButton.__proto__ || Object.getPrototypeOf(InsertKatexButton)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          translator = _this$props.translator,
          initialValue = _this$props.initialValue;

      var editorState = store.getEditorState();
      store.setEditorState((0, _insertTeXBlock2.default)(editorState, translator, initialValue));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InsertKatexButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          className = _props.className,
          children = _props.children,
          defaultContent = _props.defaultContent;

      var combinedClassName = (0, _unionClassNames2.default)(theme.insertButton, className);
      var content = _react.Children.count(children) ? children : defaultContent;

      return _react2.default.createElement(
        'button',
        { className: combinedClassName, onClick: this.onClick },
        content
      );
    }
  }]);

  return InsertKatexButton;
}(_react.Component);

InsertKatexButton.propTypes = {
  children: _propTypes2.default.node.isRequired,
  initialValue: _propTypes2.default.string,
  translator: _propTypes2.default.func.isRequired,
  theme: _propTypes2.default.any
};
InsertKatexButton.defaultProps = {
  initialValue: false,
  tex: null
};
exports.default = InsertKatexButton;