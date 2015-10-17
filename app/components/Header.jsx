var React 		  = require('react');
var _ 			  = require('underscore');
var HeaderActions = require('../actions/HeaderActions.jsx');
var HeaderStores  = require('../stores/HeaderStores.jsx')

module.exports = React.createClass({
	getInitialState : function(){
		return HeaderStores.getState();
	},
	componentDidMount : function(){
		HeaderStores.listen(this.onChange);
	},
	componentWillMount : function(){
		HeaderStores.unlisten(this.onChange)
	},
	onChange(state){
		this.setState(state)
	},
	render : function(){
		return <div className="input-group">
			<input 
				type="text" 
				className="form-control"
				value={this.state.text}
				onChange={HeaderActions.handleInputChange} />
			<span className="input-group-btn">
				<button 
					className="btn btn-default"
					onClick={HeaderActions.addNewItem.bind(this,this.state.text)}
					type="button"
					> Add 
				</button>
			</span>
		</div>
	}
})