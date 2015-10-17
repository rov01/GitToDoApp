var React 		= require('react');
var List 		= require('./components/List.jsx');
var Header 		= require('./components/Header.jsx');
var _ 			= require('underscore');

var App = React.createClass({
	getInitialState : function(){
		return {
			items : {},
			loaded : false
		}
		
	},
	componentWillMount : function(){
		$.ajax({
			url: '/api/items',
			type: 'GET'
		})
		.done(function(data) {
			this.setState({
				items : data
			})
			this.handleDataLoaded
		}.bind(this));
	},
	render : function(){
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset-2">
				<h2 className="text-center">
					To-Do List
				</h2>
				<Header items={this.state.items} />
				<hr />
				<div >
					<List items={this.state.items} />
					 { this.deleteButton() }
				</div>

			</div>
		</div>
	},
	handleDataLoaded : function(){
		this.setState({ loaded : true})
	},
	deleteButton : function(){
		if (!this.state.loaded) {
			return null
		} else {
			return <div className="text-center clear-complete">
				<hr />
				<button 
					type="button"
					className="btn btn-danger clear-complete"
					onClick={this.onDeleteClick}>
					Clear Complete
				</button>
			</div>
		}
	},
	onDeleteClick : function(){
		for( var key in this.state.items){
			if (this.state.items[key].done === true) {
				this.fb.child(key).remove()
			};
		}
	}
})

var element = React.createElement(App,{});
React.render(element,document.querySelector('.container'))