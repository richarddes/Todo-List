import React from "react";

export default class TodoElement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {checked: false, removed: false}
		this.toggleCheck = this.toggleCheck.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	toggleCheck() {
		this.setState({
			checked: !this.state.checked
		});
	}

	removeItem() {
		this.setState({removed: !this.state.removed});
		fetch("/api/deleteitem", {
			method: "PUT",
			body: this.props.item[0]
		})
		  .then(res => console.log("Data is being saved"));
	}
	
	render() {

		return(
			<div className="todo-item" onClick={this.toggleCheck} style={{display: this.state.removed && "none"}}>
				<input type="checkbox" checked={this.state.checked} />
				<div style={{textDecoration: this.state.checked && "line-through"}}>{this.props.item}</div>
				<button type="submit" className="remove-todo-item" onClick={this.removeItem} />
			</div>
		)
	}
}
