var React = require('react');

module.exports = React.createClass({
	getInitialState : function(){
		return {
			text : ''
		}
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
		$.ajax({
			url: '/api/items',
			type: 'POST',
			data: {
				text : this.state.text,
				done : false
			}
		})
		.done(function(data) {
			this.setState({ text : ''})
		}.bind(this))

		// this.props.itemsStore.push({
		// 	text : this.state.text,
		// 	done : false
		// })
		// this.setState({ text : ''})
	},
	handleInputChange : function(event){
		this.setState({ text : event.target.value})
	}
})