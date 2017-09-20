'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = insertTeXBlock;

var _draftJs = require('draft-js');

var count = 0;
var examples = ['f(x)=\\frac{ax^2}{y}+bx+c', 'P(E) = \\binom{n}{k} p^k (1-p)^{ n-k}', '\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =\n' + '1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n' + '{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }'];

function insertTeXBlock(editorState, tex) {
    var displayMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var texContent = tex;
    if (!texContent) {
        var nextFormula = count % examples.length;
        count += 1;
        texContent = examples[nextFormula];
    }
    // maybe insertTeXBlock should have a separate argument for inputvalue.
    var entityKey = _draftJs.Entity.create('KateX', 'IMMUTABLE', {
        value: texContent,
        inputValue: texContent,
        displayMode: displayMode
    });
    var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    return _draftJs.EditorState.forceSelection(newEditorState, editorState.getCurrentContent().getSelectionAfter());
}