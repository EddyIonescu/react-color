'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderSwatch = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactcss = require('reactcss');

var _reactcss2 = _interopRequireDefault(_reactcss);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _hexColorToColorName = require('hex-color-to-color-name');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderSwatch = exports.SliderSwatch = function SliderSwatch(_ref) {
  var hsl = _ref.hsl,
      offset = _ref.offset,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
      active = _ref.active,
      first = _ref.first,
      last = _ref.last;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatch: {
        height: '12px',
        background: 'hsl(' + hsl.h + ', 70%, ' + offset * 100 + '%)',
        cursor: 'pointer'
      }
    },
    'first': {
      swatch: {
        borderRadius: '2px 0 0 2px'
      }
    },
    'last': {
      swatch: {
        borderRadius: '0 2px 2px 0'
      }
    },
    'active': {
      swatch: {
        transform: 'scaleY(1.8)',
        borderRadius: '3.6px/2px'
      }
    }
  }, { active: active, first: first, last: last });

  var handleClick = function handleClick(e) {
    return onClick({
      h: hsl.h,
      s: 0.7,
      l: offset,
      source: 'hsl'
    }, e);
  };

  var handleKeyDown = function handleKeyDown(e) {
    return e.key === 'Enter' && handleClick(e);
  };

  var getColorName = function getColorName() {
    var hexColor = (0, _tinycolor2.default)(hsl).toHex();
    var colorName = (0, _hexColorToColorName.GetColorName)(hexColor);
    return colorName;
  };

  return _react2.default.createElement('div', {
    'aria-label': 'Change color to ' + getColorName(),
    tabIndex: 0,
    style: styles.swatch,
    onClick: function onClick(e) {
      return handleClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return handleKeyDown(e);
    }
  });
};

exports.default = SliderSwatch;