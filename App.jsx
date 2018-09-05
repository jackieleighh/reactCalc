import React from 'react';

class Calculator extends React.Component {
	constructor() {
		super();
		this.state ={
			numbers: [0,1,2,3,4,5,6,7,8,9],
			result: null,
			currentOp: null,
			currentNum: null,
			previousNum: null
		}
	}
	calculateResult() {
		var res = null;
		if(this.state.previousNum) {
			switch(this.state.currentOp) {
				case '+':
					res = this.state.previousNum + parseFloat(this.state.currentNum);
					break;
				case '-':
					res = this.state.previousNum - parseFloat(this.state.currentNum);
					break;
				case '*':
					res = this.state.previousNum * parseFloat(this.state.currentNum);
					break;
				case '/':
					res = this.state.previousNum / parseFloat(this.state.currentNum);
					break;
				case '=':
					res = parseFloat(this.state.currentNum);
					break;
			}
		} else {
			res = parseFloat(this.state.currentNum);
		}
		this.setState({ result: res, previousNum: res, currentNum: null });
	}
	handleNumberClick(i) {
		if(this.state.currentNum == 0 || this.state.currentNum == null) {
			this.setState({
				currentNum: "" + i
			});
		} else {
			this.setState({
				currentNum: "" + this.state.currentNum + i
			});
		}
	}
	handleOperationClick(op) {
		if(this.state.currentNum) {
			this.calculateResult();
			switch(op) {
				case '+':
					this.setState({ currentOp: '+' });
					break;
				case '-':
					this.setState({ currentOp: '-' });
					break;
				case '*':
					this.setState({ currentOp: '*' });
					break;
				case '/':
					this.setState({ currentOp: '/' });
					break;
			}
		}
	}
	clearClick() {
		this.setState({
			result: 0,
			currentOp: null,
			currentNum: 0,
			previousNum: null
		});
	}
	render() {
		return (
			<div>
				<div className="result">
					{this.state.currentNum ? this.state.currentNum : this.state.result}
				</div>
				<div className="numbers">
					{this.state.numbers.map((num) => <Button value={num} onClick={() => this.handleNumberClick(num)} />)}
				</div>
				<div className="ops">
					<Button value="+" onClick={() => this.handleOperationClick('+')} />
					<Button value="-" onClick={() => this.handleOperationClick('-')} />
					<Button value="*" onClick={() => this.handleOperationClick('*')} />
					<Button value="/" onClick={() => this.handleOperationClick('/')} />
					<Button value="=" onClick={() => this.handleOperationClick('=')} />
					<Button value="C" onClick={() => this.clearClick()} />
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