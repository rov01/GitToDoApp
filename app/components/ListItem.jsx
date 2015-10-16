var React = require('react');
var rootUrl = 'https://note-take.firebaseio.com/';


module.exports = React.createClass({
	getInitialState : function(){
		return {
			text : this.props.item.text,
			done : this.props.item.done,
			textChanged : false
		}
	},
	render : function(){
		return <div className="input-group">
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
		</div>
	},
	changeButtons : function(){
			console.log(this.state)
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
		this.setState(update)
		// this.fb.update(update)
	},
	handleTextChange : function(event){
		this.setState({text:event.target.value, textChanged : true})
	},
	handleDeleteClick : function(event){
		// this.fb.remove();
	},
	handleSaveClick : function(event){
		// this.fb.update({text:this.state.text})
		this.setState({textChanged : false})
	},
	handleUndoClick : function(event){
		this.setState({
			text : this.props.item.text,
			textChanged : false 
		})
	}
})