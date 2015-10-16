var React 		= require('react');
var ReactFire 	= require('reactfire');
var FireBase 	= require('firebase');
var List 		= require('./components/List.jsx');
var Header 		= require('./components/Header.jsx')
var rootUrl 	= 'https://note-take.firebaseio.com/';
var _ 			= require('underscore');

var App = React.createClass({
	mixins : [ReactFire],
	getInitialState : function(){
		return {
			items : {},
			loaded : false
		}
	},
	componentWillMount : function(){
		var ref = new FireBase(rootUrl + 'items/');
		this.fb = ref; 
		this.bindAsObject(ref,'items');
		this.fb.on('value',this.handleDataLoaded);
	},
	render : function(){
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset-2">
				<h2 className="text-center">
					To-Do List
				</h2>
				<Header itemsStore={this.firebaseRefs.items} />
				<hr />
				<div className={"content"+ (this.state.loaded ? 'loaded' : '')} >
					<List items={this.state.items} />
					{ !_.isNull(this.state.items) ? this.deleteButton() : null }
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
			var count = 0;
			for(var key in this.state.items){
				if (count > 1) {
					return <div className="text-center clear-complete">
						<hr />
						<button 
							type="button"
							className="btn btn-danger clear-complete"
							onClick={this.onDeleteClick}>
							Clear Complete
						</button>
					</div>
				};
				count++
			}
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