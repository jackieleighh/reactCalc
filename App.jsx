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
	clearCurrentClick() {
		this.setState({
			currentNum: 0
		});
	}
	changeSign() {
		this.calculateResult();
		this.setState({
			result: -this.state.result
		});
	}
	render() {
		return (
			<div>
				<div className="result">
					{this.state.currentNum ? this.state.currentNum : this.state.result}
				</div>
				<div class="row">
					<Button value="AC" onClick={() => this.clearClick()} />
					<Button value="C" onClick={() => this.clearCurrentClick()} />
					<Button value="+/-" onClick={() => this.changeSign()} />
					<Button value="/" onClick={() => this.handleOperationClick('/')} />
				</div>
				<div class="row">
					<Button value="7" onClick={() => this.handleNumberClick(7)} />
					<Button value="8" onClick={() => this.handleNumberClick(8)} />
					<Button value="9" onClick={() => this.handleNumberClick(9)} />
					<Button value="*" onClick={() => this.handleOperationClick('*')} />
				</div>
				<div class="row">
					<Button value="6" onClick={() => this.handleNumberClick(6)} />
					<Button value="5" onClick={() => this.handleNumberClick(5)} />
					<Button value="4" onClick={() => this.handleNumberClick(4)} />
					<Button value="-" onClick={() => this.handleOperationClick('-')} />
				</div>
				<div class="row">
					<Button value="3" onClick={() => this.handleNumberClick(3)} />
					<Button value="2" onClick={() => this.handleNumberClick(2)} />
					<Button value="1" onClick={() => this.handleNumberClick(1)} />
					<Button value="+" onClick={() => this.handleOperationClick('+')} />
				</div>
				<div class="row">
					<Button className="zero" value="0" onClick={() => this.handleNumberClick(0)} />
					<Button value="." onClick={() => this.handleNumberClick('.')} />
					<Button value="=" onClick={() => this.handleOperationClick('=')} />
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