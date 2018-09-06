import React from 'react';

class Calculator extends React.Component {
	constructor() {
		super();
		this.state ={
			result: 0,
			currentOp: null,
			currentNum: null,
			previousNum: null
		}
	}
	calculateResult() {
		var num = null, res = null;
		if(this.state.currentNum == null) {
			num = parseFloat(this.state.result);
		} else {
			num = parseFloat(this.state.currentNum);
		}
		res = num;
		switch(this.state.currentOp) {
			case '+':
				res = this.state.previousNum + num;
				break;
			case '-':
				res = this.state.previousNum - num;
				break;
			case '*':
				res = this.state.previousNum * num;
				break;
			case '/':
				res = this.state.previousNum / num;
				break;
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
		if(this.state.currentNum != null) {
			this.calculateResult();
		}
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
			case '=':
				this.setState({ currentOp: '=' });
				this.calculateResult();
				break;
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
			result: this.state.result*-1, 
			previousNum: this.state.previousNum*-1
		});
	}
	render() {
		return (
			<div className="calc">
				<div className="result">
					<p>{this.state.currentNum ? this.state.currentNum : this.state.result}</p>
				</div>
				<Grid onClick={i => this.handleNumberClick(i)} onOpClick={x => this.handleOperationClick(x)} clearClick={() => this.clearClick()} clearCurrentClick={() => this.clearCurrentClick()} changeSign={() => this.changeSign()} />
			</div>
		);
	}
}

class Grid extends React.Component {
	renderButton(i) {
		if(i == 0) {
			return (
	    		<Button
	        		value={i}
	        		onClick={() => this.props.onClick(i)}
	        		classVal="zero"
	      		/>
	    	);
		} else {
		    return (
	    		<Button
	        		value={i}
	        		onClick={() => this.props.onClick(i)}
	      		/>
	    	);
		}
  	}
  	renderOpButton(x) {
	    return (
    		<Button
        		value={x}
        		onClick={() => this.props.onOpClick(x)}
        		classVal="ops"
      		/>
    	);
  	}
	render() {
		return(
			<div className="grid">
				<div class="row">
					<Button value="AC" classVal="top-op" onClick={this.props.clearClick} />
					<Button value="C" classVal="top-op" onClick={this.props.clearCurrentClick} />
					<Button value="+/-" classVal="top-op" onClick={this.props.changeSign} />
					{ this.renderOpButton('/') }
				</div>
				<div class="row">
					{ this.renderButton(7) }
					{ this.renderButton(8) }
					{ this.renderButton(9) }
					{ this.renderOpButton('*') }
				</div>
				<div class="row">
					{ this.renderButton(4) }
					{ this.renderButton(5) }
					{ this.renderButton(6) }
					{ this.renderOpButton('-') }
				</div>
				<div class="row">
					{ this.renderButton(1) }
					{ this.renderButton(2) }
					{ this.renderButton(3) }
					{ this.renderOpButton('+') }
				</div>
				<div class="row">
					{ this.renderButton(0) }
					{ this.renderButton('.') }
					{ this.renderOpButton('=') }
				</div>
			</div>
		);
	}
}

class Button extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick} class={this.props.classVal}>
				{this.props.value}
			</button>
		);
	}
}

export default Calculator;