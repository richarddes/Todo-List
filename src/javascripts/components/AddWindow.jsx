import React from "react";

export default class AddWindow extends React.Component {
	constructor(props) {
	super(props);

	this.state = {data: ""}
	this.handleChange = this.handleChange.bind(this);
	this.handleKeyPress = this.handleKeyPress.bind(this);
	this.inputField = this.inputField.bind(this);
	}

	handleChange(e) {
		this.setState({
			data: e.target.value
		})
	}

	handleKeyPress(e) {
		if(e.keyCode == 13) {
			if(this.state.data == "") {
				alert("Please insert an item");
				return;
			}
			this.inputField();
		}
	}

	inputField() {
		this.props.addItem(this.state.data);
		this.setState({data: ""});
	}

	render() {
		return(
			<div>
				<input id="input-field" type="text" placeholder="Add item; Press Enter to save" value={this.state.data} onChange={this.handleChange} onKeyDown={this.handleKeyPress} />
			</div>
		)
	}
}
