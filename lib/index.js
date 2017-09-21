'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _TeXBlock = require('./components/TeXBlock');

var _TeXBlock2 = _interopRequireDefault(_TeXBlock);

var _removeTeXBlock = require('./modifiers/removeTeXBlock');

var _removeTeXBlock2 = _interopRequireDefault(_removeTeXBlock);

var _InsertKatexButton = require('./components/InsertKatexButton');

var _InsertKatexButton2 = _interopRequireDefault(_InsertKatexButton);

var _styles = {
  "tex": "draftJsKatexPlugin__tex__3cUXo",
  "activeTeX": "draftJsKatexPlugin__activeTeX__1dy99",
  "panel": "draftJsKatexPlugin__panel__330KK",
  "texValue": "draftJsKatexPlugin__texValue__3bIH_",
  "buttons": "draftJsKatexPlugin__buttons__uSU4b",
  "saveButton": "draftJsKatexPlugin__saveButton__Gu8cY",
  "removeButton": "draftJsKatexPlugin__removeButton__cDoFb",
  "invalidButton": "draftJsKatexPlugin__invalidButton__12Wrj",
  "insertButton": "draftJsKatexPlugin__insertButton__2uR4O"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noopTranslator(tex) {
  return tex;
}

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var theme = Object.assign(_styles2.default, config.theme || {});
  var insertContent = config.insertContent || 'Ω';
  var doneContent = config.doneContent || {
    valid: 'Done',
    invalid: 'Invalid TeX'
  };
  var removeContent = config.removeContent || 'Remove';
  var translator = config.translator || noopTranslator;

  var store = {
    getEditorState: undefined,
    setEditorState: undefined,
    getReadOnly: undefined,
    setReadOnly: undefined,
    onChange: undefined
  };

  var liveTeXEdits = new Map();
  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState,
          getReadOnly = _ref.getReadOnly,
          setReadOnly = _ref.setReadOnly;

      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
      store.getReadOnly = getReadOnly;
      store.setReadOnly = setReadOnly;
    },

    blockRendererFn: function blockRendererFn(block) {
      if (block.getType() === 'atomic') {
        var entity = _draftJs.Entity.get(block.getEntityAt(0));
        var type = entity.getType();

        if (type === 'KateX') {
          return {
            component: (0, _decorateComponentWithProps2.default)(_TeXBlock2.default, {
              theme: theme,
              store: store,
              doneContent: doneContent,
              removeContent: removeContent,
              translator: translator,
              MathInput: config.MathInput
            }),
            editable: false,
            props: {
              onStartEdit: function onStartEdit(blockKey) {
                liveTeXEdits.set(blockKey, true);
                store.setReadOnly(liveTeXEdits.size);
              },

              onFinishEdit: function onFinishEdit(blockKey, newEditorState) {
                liveTeXEdits.delete(blockKey);
                store.setReadOnly(liveTeXEdits.size);
                store.setEditorState(_draftJs.EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
              },

              onRemove: function onRemove(blockKey) {
                liveTeXEdits.delete(blockKey);
                store.setReadOnly(liveTeXEdits.size);

                var editorState = store.getEditorState();
                var newEditorState = (0, _removeTeXBlock2.default)(editorState, blockKey);
                store.setEditorState(newEditorState);
              }
            }
          };
        }
      }
      return null;
    },
    InsertButton: (0, _decorateComponentWithProps2.default)(_InsertKatexButton2.default, {
      theme: theme,
      store: store,
      translator: translator,
      defaultContent: insertContent
    })
  };
};