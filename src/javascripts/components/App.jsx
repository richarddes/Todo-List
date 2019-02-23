import React from "react";

import TodoElement from "./TodoElement.jsx";
import AddWindow from "./AddWindow.jsx";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: []}

		this.addItem = this.addItem.bind(this);
	}

	componentDidMount() {
		fetch("/api/getdata")
	  	  .then(res => res.json())
		  .then(data => this.setState({
		  	items: data
		  }))
	}

	addItem(data) {
		const items = this.state.items;
		items.push(data);
		this.setState({items: items});
		fetch("/api/postdata", {
			method: "POST",
			body: data
		})	
		.then(res => console.log("Post request send"))
	}

	render() {
		return (
			<div id="app">
				<h1>ToDo</h1>
				<AddWindow addItem={this.addItem} />
				<div id="todos">
					{this.state.items.map(item => {
						return <TodoElement key={Object.keys(item)} item={Object.values(item)} />
					})}
				</div>
			</div>
		)
	}
}
