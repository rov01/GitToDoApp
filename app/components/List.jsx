var React = require('react');
var ListItem = require('./ListItem.jsx');

module.exports = React.createClass({
	render : function(){
		return <div>
			{this.renderList()}
		</div>
	},
	renderList : function(){
		if (!this.props.items) {
			return <h4 className="text-center">
				Add a todo to get Start
			</h4>
		}else{
			var list = [];
			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = item._id;
				list.push(
					<ListItem item={item} key={key}></ListItem>
				)
			};
			return list
		}
	}
})