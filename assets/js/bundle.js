(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var HeaderActions = (function () {
	function HeaderActions() {
		_classCallCheck(this, HeaderActions);

		this.generateActions('addNewItemSuccess', 'addNewItemFail', 'handleInputChange');
	}

	_createClass(HeaderActions, [{
		key: 'addNewItem',
		value: function addNewItem(text) {
			var _this = this;

			$.ajax({
				url: '/api/items',
				type: 'POST',
				data: {
					text: text,
					done: false
				}
			}).done(function (data) {
				_this.actions.addNewItemSuccess(data);
			}).fail(function (data) {
				_this.actions.addNewItemFail(data);
			});
		}
	}]);

	return HeaderActions;
})();

exports['default'] = _alt2['default'].createActions(HeaderActions);
module.exports = exports['default'];

},{"../alt":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

exports['default'] = new _alt2['default']();
module.exports = exports['default'];

},{"alt":"alt"}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsListJsx = require('./components/List.jsx');

var _componentsListJsx2 = _interopRequireDefault(_componentsListJsx);

var _componentsHeaderJsx = require('./components/Header.jsx');

var _componentsHeaderJsx2 = _interopRequireDefault(_componentsHeaderJsx);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var App = _react2['default'].createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			items: {},
			loaded: false
		};
	},
	componentWillMount: function componentWillMount() {
		$.ajax({
			url: '/api/items',
			type: 'GET'
		}).done((function (data) {
			this.setState({
				items: data
			});
			this.handleDataLoaded;
		}).bind(this));
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'row panel panel-default' },
			_react2['default'].createElement(
				'div',
				{ className: 'col-md-8 col-md-offset-2' },
				_react2['default'].createElement(
					'h2',
					{ className: 'text-center' },
					'To-Do List'
				),
				_react2['default'].createElement(_componentsHeaderJsx2['default'], { items: this.state.items }),
				_react2['default'].createElement('hr', null),
				_react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(_componentsListJsx2['default'], { items: this.state.items }),
					this.deleteButton()
				)
			)
		);
	},
	handleDataLoaded: function handleDataLoaded() {
		this.setState({ loaded: true });
	},
	deleteButton: function deleteButton() {
		if (!this.state.loaded) {
			return null;
		} else {
			return _react2['default'].createElement(
				'div',
				{ className: 'text-center clear-complete' },
				_react2['default'].createElement('hr', null),
				_react2['default'].createElement(
					'button',
					{
						type: 'button',
						className: 'btn btn-danger clear-complete',
						onClick: this.onDeleteClick },
					'Clear Complete'
				)
			);
		}
	},
	onDeleteClick: function onDeleteClick() {
		for (var key in this.state.items) {
			if (this.state.items[key].done === true) {
				this.fb.child(key).remove();
			};
		}
	}
});

var element = _react2['default'].createElement(App, {});
_react2['default'].render(element, document.querySelector('.container'));

},{"./components/Header.jsx":4,"./components/List.jsx":5,"react":"react","underscore":"underscore"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _actionsHeaderActionsJsx = require('../actions/HeaderActions.jsx');

var _actionsHeaderActionsJsx2 = _interopRequireDefault(_actionsHeaderActionsJsx);

var _storesHeaderStoresJsx = require('../stores/HeaderStores.jsx');

var _storesHeaderStoresJsx2 = _interopRequireDefault(_storesHeaderStoresJsx);

exports['default'] = _react2['default'].createClass({
	displayName: 'Header',

	getInitialState: function getInitialState() {
		return _storesHeaderStoresJsx2['default'].getState();
	},
	componentDidMount: function componentDidMount() {
		_storesHeaderStoresJsx2['default'].listen(this.onChange);
	},
	componentWillMount: function componentWillMount() {
		_storesHeaderStoresJsx2['default'].unlisten(this.onChange);
	},
	onChange: function onChange(state) {
		this.setState(state);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'input-group' },
			_react2['default'].createElement('input', {
				type: 'text',
				className: 'form-control',
				value: this.state.text,
				onChange: _actionsHeaderActionsJsx2['default'].handleInputChange }),
			_react2['default'].createElement(
				'span',
				{ className: 'input-group-btn' },
				_react2['default'].createElement(
					'button',
					{
						className: 'btn btn-default',
						onClick: _actionsHeaderActionsJsx2['default'].addNewItem.bind(this, this.state.text),
						type: 'button'
					},
					' Add'
				)
			)
		);
	}
});
module.exports = exports['default'];

},{"../actions/HeaderActions.jsx":1,"../stores/HeaderStores.jsx":7,"react":"react","underscore":"underscore"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListItemJsx = require('./ListItem.jsx');

var _ListItemJsx2 = _interopRequireDefault(_ListItemJsx);

exports['default'] = _react2['default'].createClass({
	displayName: 'List',

	render: function render() {
		return _react2['default'].createElement(
			'div',
			null,
			this.renderList()
		);
	},
	renderList: function renderList() {
		if (!this.props.items) {
			return _react2['default'].createElement(
				'h4',
				{ className: 'text-center' },
				'Add a todo to get Start'
			);
		} else {
			var list = [];
			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = item._id;
				list.push(_react2['default'].createElement(_ListItemJsx2['default'], { item: item, key: key }));
			};
			return list;
		}
	}
});
module.exports = exports['default'];

},{"./ListItem.jsx":6,"react":"react"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports["default"] = _react2["default"].createClass({
	displayName: "ListItem",

	getInitialState: function getInitialState() {
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false,
			showItem: true
		};
	},
	render: function render() {
		return _react2["default"].createElement(
			"div",
			{ className: "input-group" },
			_react2["default"].createElement(
				"span",
				{ className: "input-group-addon" },
				_react2["default"].createElement("input", {
					type: "checkbox",
					checked: this.state.done,
					onChange: this.handleDoneChange })
			),
			_react2["default"].createElement("input", {
				type: "text",
				value: this.state.text,
				disabled: this.state.done,
				className: "form-control",
				onChange: this.handleTextChange }),
			_react2["default"].createElement(
				"span",
				{ className: "input-group-btn" },
				this.changeButtons(),
				_react2["default"].createElement(
					"button",
					{
						className: "btn btn-danger",
						onClick: this.handleDeleteClick },
					"Delete"
				)
			)
		);
	},
	changeButtons: function changeButtons() {
		if (this.state.textChanged) {
			return _react2["default"].createElement(
				"span",
				null,
				_react2["default"].createElement(
					"button",
					{
						className: "btn btn-success",
						onClick: this.handleSaveClick },
					"Save"
				),
				_react2["default"].createElement(
					"button",
					{
						className: "btn btn-primary",
						onClick: this.handleUndoClick },
					"Undo"
				)
			);
		} else {
			return null;
		}
	},
	handleDoneChange: function handleDoneChange(event) {
		var update = { done: event.target.checked };
		$.ajax({
			url: '/api/items/' + this.props.item.key,
			type: 'PUT',
			data: {
				text: this.state.text,
				done: true
			}
		}).done((function (data) {
			if (data) {
				this.setState(update);
			};
		}).bind(this));
	},
	handleTextChange: function handleTextChange(event) {
		this.setState({ text: event.target.value, textChanged: true });
	},
	handleDeleteClick: function handleDeleteClick(event) {
		$.ajax({
			url: '/api/items/' + this.props.item.key,
			type: 'DELETE'
		}).done((function (data) {
			var node = this.getDOMNode();
			_react2["default"].unmountComponentAtNode(node);
			$(node).remove();
		}).bind(this));
	},
	handleSaveClick: function handleSaveClick(event) {
		$.ajax({
			url: '/api/items/' + this.props.item.key,
			type: 'PUT',
			data: {
				text: this.state.text,
				done: false
			}
		}).done((function (data) {
			this.setState({ textChanged: false });
		}).bind(this));
	},
	handleUndoClick: function handleUndoClick(event) {
		this.setState({
			text: this.props.item.text,
			textChanged: false
		});
	}
});
module.exports = exports["default"];

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsHeaderActionsJsx = require('../actions/HeaderActions.jsx');

var _actionsHeaderActionsJsx2 = _interopRequireDefault(_actionsHeaderActionsJsx);

var HeaderStore = (function () {
	function HeaderStore() {
		_classCallCheck(this, HeaderStore);

		this.bindActions(_actionsHeaderActionsJsx2['default']);
		this.text = '';
	}

	_createClass(HeaderStore, [{
		key: 'onAddNewItemSuccess',
		value: function onAddNewItemSuccess(item) {
			this.text = '';
		}
	}, {
		key: 'onAddNewItemFail',
		value: function onAddNewItemFail(msg) {
			console.log(msg);
		}
	}, {
		key: 'onHandleInputChange',
		value: function onHandleInputChange(event) {
			this.text = event.target.value;
		}
	}]);

	return HeaderStore;
})();

exports['default'] = _alt2['default'].createStore(HeaderStore);
module.exports = exports['default'];

},{"../actions/HeaderActions.jsx":1,"../alt":2}]},{},[3]);
