var React 	= require('react');
var _ 		= require('underscore');

module.exports = React.createClass({
	getInitialState : function(){
		return {
			text : '',
			items : this.props.items
		};
	},
	render : function(){
		return <div className="input-group">
			<input 
				type="text" 
				className="form-control"
				value={this.state.text}
				onChange={this.handleInputChange} />
			<span className="input-group-btn">
				<button 
					className="btn btn-default"
					onClick={this.handleClick}
					type="button"
					> Add 
				</button>
			</span>
		</div>
	},
	handleClick : function(event){
		location.reload();
		$.ajax({
			url: '/api/items',
			type: 'POST',
			data: {
				text : this.state.text,
				done : false
			}
		})
		.done(function(data) {
			this.setState({ text : '' })
		}.bind(this));
	},
	handleInputChange : function(event){
		this.setState({ text : event.target.value})
	}
})