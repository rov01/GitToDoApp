import React from 'react';

export default React.createClass({
	getInitialState : function(){
		return {
			text : this.props.item.text,
			done : this.props.item.done,
			textChanged : false,
			showItem : true 
		}
	},
	render : function(){
		return ( <div className="input-group">
				<span className="input-group-addon">
					<input 
					type="checkbox"
					checked={this.state.done}
					onChange={this.handleDoneChange} />
				</span>
				<input 
					type="text" 
					value={this.state.text}
					disabled={this.state.done}
					className="form-control"
					onChange={this.handleTextChange} />
				<span className="input-group-btn">
					{this.changeButtons()}
					<button 
						className="btn btn-danger"
						onClick={this.handleDeleteClick} > 
						Delete 
					</button>
				</span>
			</div>)
	},
	changeButtons : function(){
		if (this.state.textChanged) {
			return <span>
				<button 
					className="btn btn-success"
					onClick={this.handleSaveClick}>
					Save 
				</button>
				<button 
					className="btn btn-primary"
					onClick={this.handleUndoClick}>
					Undo 
				</button>
			</span>
		}else{
			return null
		}
	},
	handleDoneChange : function(event){
		var update = {done:event.target.checked};
		$.ajax({
			url: '/api/items/' + this.props.item.key ,
			type: 'PUT',
			data: {
				text 	: this.state.text,
				done 	: true 
			},
		})
		.done(function(data) {
			if (data) {
				this.setState(update)
			};
		}.bind(this));
	},
	handleTextChange : function(event){
		this.setState({text:event.target.value, textChanged : true})
	},
	handleDeleteClick : function(event){
		$.ajax({
			url: '/api/items/' + this.props.item.key,
			type: 'DELETE',
		})
		.done(function(data) {
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			$(node).remove();
		}.bind(this));
	},
	handleSaveClick : function(event){
		$.ajax({
			url: '/api/items/' + this.props.item.key ,
			type: 'PUT',
			data: {
				text 	: this.state.text,
				done 	: false
			},
		})
		.done(function(data) {
			this.setState({textChanged : false})
		}.bind(this));	
	},
	handleUndoClick : function(event){
		this.setState({
			text : this.props.item.text,
			textChanged : false 
		})
	}
})