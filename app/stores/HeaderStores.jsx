import alt  from '../alt';
import HeaderActions from '../actions/HeaderActions.jsx';

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

export default alt.createStore(HeaderStore);