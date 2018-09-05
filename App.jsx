import React from 'react';

class Calculator extends React.Component {
	constructor() {
		super();
		this.state ={
			numbers: [1,2,3,4,5,6,7,8,9],
			result: null,
			previousNum: null
		}
	}
	handleNumberClick(i) {
		if(this.state.result == 0 || this.state.result == null) {
			this.setState({
				result: "" + i
			});
		} else {
			this.setState({
				result: "" + this.state.result + i
			});
		}
	}
	render() {
		return (
			<div>
				<div className="result">
					{this.state.result}
				</div>
				<div className="numbers">
					{this.state.numbers.map((num) => <Button value={num} onClick={() => this.handleNumberClick(num)} />)}
				</div>
			</div>
		);
	}
}

class Button extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}

export default Calculator;