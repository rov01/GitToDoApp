(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var List = require('./components/List.jsx');
var Header = require('./components/Header.jsx');
var _ = require('underscore');

var App = React.createClass({
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
		return React.createElement(
			'div',
			{ className: 'row panel panel-default' },
			React.createElement(
				'div',
				{ className: 'col-md-8 col-md-offset-2' },
				React.createElement(
					'h2',
					{ className: 'text-center' },
					'To-Do List'
				),
				React.createElement(Header, { items: this.state.items }),
				React.createElement('hr', null),
				React.createElement(
					'div',
					null,
					React.createElement(List, { items: this.state.items }),
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
			return React.createElement(
				'div',
				{ className: 'text-center clear-complete' },
				React.createElement('hr', null),
				React.createElement(
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

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

},{"./components/Header.jsx":2,"./components/List.jsx":3,"react":"react","underscore":"underscore"}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			text: '',
			items: this.props.items
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'input-group' },
			React.createElement('input', {
				type: 'text',
				className: 'form-control',
				value: this.state.text,
				onChange: this.handleInputChange }),
			React.createElement(
				'span',
				{ className: 'input-group-btn' },
				React.createElement(
					'button',
					{
						className: 'btn btn-default',
						onClick: this.handleClick,
						type: 'button'
					},
					' Add'
				)
			)
		);
	},
	handleClick: function handleClick(event) {
		location.reload();
		$.ajax({
			url: '/api/items',
			type: 'POST',
			data: {
				text: this.state.text,
				done: false
			}
		}).done((function (data) {
			this.setState({ text: '' });
		}).bind(this));
	},
	handleInputChange: function handleInputChange(event) {
		this.setState({ text: event.target.value });
	}
});

},{"react":"react","underscore":"underscore"}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var ListItem = require('./ListItem.jsx');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			null,
			this.renderList()
		);
	},
	renderList: function renderList() {
		if (!this.props.items) {
			return React.createElement(
				'h4',
				{ className: 'text-center' },
				'Add a todo to get Start'
			);
		} else {
			var list = [];
			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = item._id;
				list.push(React.createElement(ListItem, { item: item, key: key }));
			};
			return list;
		}
	}
});

},{"./ListItem.jsx":4,"react":"react"}],4:[function(require,module,exports){
"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	getInitialState: function getInitialState() {
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false,
			showItem: true
		};
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "input-group" },
			React.createElement(
				"span",
				{ className: "input-group-addon" },
				React.createElement("input", {
					type: "checkbox",
					checked: this.state.done,
					onChange: this.handleDoneChange })
			),
			React.createElement("input", {
				type: "text",
				value: this.state.text,
				disabled: this.state.done,
				className: "form-control",
				onChange: this.handleTextChange }),
			React.createElement(
				"span",
				{ className: "input-group-btn" },
				this.changeButtons(),
				React.createElement(
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
			return React.createElement(
				"span",
				null,
				React.createElement(
					"button",
					{
						className: "btn btn-success",
						onClick: this.handleSaveClick },
					"Save"
				),
				React.createElement(
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
			React.unmountComponentAtNode(node);
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

},{"react":"react"}]},{},[1]);
