'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

var _draftJs = require('draft-js');

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _KatexOutput = require('./KatexOutput');

var _KatexOutput2 = _interopRequireDefault(_KatexOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import MathInput from './math-input/components/app';

var TeXBlock = function (_Component) {
    _inherits(TeXBlock, _Component);

    function TeXBlock(props) {
        _classCallCheck(this, TeXBlock);

        var _this = _possibleConstructorReturn(this, (TeXBlock.__proto__ || Object.getPrototypeOf(TeXBlock)).call(this, props));

        _this.callbacks = {};

        _this.onClick = function () {
            if (_this.state.editMode || _this.props.store.getReadOnly()) {
                return;
            }
            _this.setState(_extends({
                editMode: true
            }, _this.getValue()), function () {
                _this.startEdit();
            });
        };

        _this.onValueChange = function (evt) {
            var value = evt.target.value;
            _this.onMathInputChange(value);
        };

        _this.onFocus = function () {
            if (_this.callbacks.blur) {
                _this.callbacks.blur();
            }
        };

        _this.onMathInputChange = function (inputValue) {
            var invalid = false;
            var value = _this.props.translator(inputValue);
            try {
                _katex2.default.__parse(value); // eslint-disable-line no-underscore-dangle
            } catch (e) {
                invalid = true;
            } finally {
                _this.setState({
                    invalidTeX: invalid,
                    value: value,
                    inputValue: inputValue
                });
            }
        };

        _this.getValue = function () {
            var entityKey = _this.props.block.getEntityAt(0);
            var entityData = _draftJs.Entity.get(entityKey).getData();
            return entityData;
        };

        _this.startEdit = function () {
            var _this$props = _this.props,
                block = _this$props.block,
                blockProps = _this$props.blockProps;

            blockProps.onStartEdit(block.getKey());
        };

        _this.finishEdit = function (newContentState) {
            var _this$props2 = _this.props,
                block = _this$props2.block,
                blockProps = _this$props2.blockProps;

            blockProps.onFinishEdit(block.getKey(), newContentState);
        };

        _this.remove = function () {
            var _this$props3 = _this.props,
                block = _this$props3.block,
                blockProps = _this$props3.blockProps;

            blockProps.onRemove(block.getKey());
        };

        _this.save = function () {
            var _this$props4 = _this.props,
                block = _this$props4.block,
                store = _this$props4.store;


            var entityKey = block.getEntityAt(0);
            var editorState = store.getEditorState();

            _draftJs.Entity.mergeData(entityKey, {
                value: _this.state.value,
                inputValue: _this.state.inputValue
            });

            _this.setState({
                invalidTeX: false,
                editMode: false,
                value: null
            }, _this.finishEdit.bind(_this, editorState));
        };

        _this.state = { editMode: false };
        return _this;
    }

    _createClass(TeXBlock, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                theme = _props.theme,
                doneContent = _props.doneContent,
                removeContent = _props.removeContent;


            var texContent = null;
            if (this.state.editMode) {
                if (this.state.invalidTeX) {
                    texContent = '';
                } else {
                    texContent = this.state.value;
                }
            } else {
                texContent = this.getValue().value;
            }
            var displayMode = this.getValue().displayMode;

            var className = theme.tex;
            if (this.state.editMode) {
                className = (0, _unionClassNames2.default)(className, theme.activeTeX);
            }

            var editPanel = null;
            if (this.state.editMode) {
                var buttonClass = theme.saveButton;
                if (this.state.invalidTeX) {
                    buttonClass = (0, _unionClassNames2.default)(buttonClass, theme.invalidButton);
                }

                editPanel = _react2.default.createElement(
                    'div',
                    { className: theme.panel },
                    _react2.default.createElement('textarea', {
                        className: theme.texValue,
                        onChange: this.onValueChange,
                        onFocus: this.onFocus,
                        ref: function ref(textarea) {
                            _this2.textarea = textarea;
                        },
                        value: this.state.inputValue
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: theme.buttons },
                        _react2.default.createElement(
                            'button',
                            {
                                className: buttonClass,
                                disabled: this.state.invalidTeX,
                                onClick: this.save
                            },
                            this.state.invalidTeX ? doneContent.invalid : doneContent.valid
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                className: theme.removeButton,
                                onClick: this.remove
                            },
                            removeContent
                        )
                    )
                );
            }

            var MathInput = this.props.MathInput || _KatexOutput2.default;
            return _react2.default.createElement(
                'div',
                { className: className },
                this.state.editMode ? _react2.default.createElement(MathInput, {
                    value: texContent,
                    callbacks: this.callbacks,
                    onChange: this.onMathInputChange,
                    displayMode: displayMode
                }) : _react2.default.createElement(_KatexOutput2.default, {
                    value: texContent,
                    onClick: this.onClick,
                    displayMode: displayMode
                }),
                editPanel
            );
        }
    }]);

    return TeXBlock;
}(_react.Component);

exports.default = TeXBlock;