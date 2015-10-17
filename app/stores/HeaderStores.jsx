var alt = require('../alt');
var HeaderActions = require('../actions/HeaderActions.jsx');

class HeaderStore {
	constructor(){
		this.bindActions(HeaderActions);
		this.text = '';
	}

	onAddNewItemSuccess(item){
		this.text = '';
	};

	onAddNewItemFail(msg){
		console.log(msg)
	};
	onHandleInputChange(event){
		this.text = event.target.value;
	}

}

module.exports = alt.createStore(HeaderStore);