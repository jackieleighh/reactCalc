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

		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}
	handleKeyDown(e) {
		switch(e.key){
			case '0':
				this.handleNumberClick(0);
				break;
			case '1':
				this.handleNumberClick(1);
				break;
			case '2':
				this.handleNumberClick(2);
				break;
			case '3':
				this.handleNumberClick(3);
				break;
			case '4':
				this.handleNumberClick(4);
				break;
			case '5':
				this.handleNumberClick(5);
				break;
			case '6':
				this.handleNumberClick(6);
				break;
			case '7':
				this.handleNumberClick(7);
				break;
			case '8': 
				this.handleNumberClick(8);
				break;
			case '9':
				this.handleNumberClick(9);
				break;
			case '.':
				this.handleNumberClick('.');
				break;
			case '=':
				this.handleOperationClick('=');
				break;
			case 'Enter':
				this.handleOperationClick('Enter');
				break;
			case '+':
				this.handleOperationClick('+');
				break;
			case '-':
				this.handleOperationClick('-');
				break;
			case '*':
				this.handleOperationClick('*');
				break;
			case '/':
				this.handleOperationClick('/');
				break;
			case 'C':
				this.clearClick();
				break;
			case 'c':
				this.clearClick();
				break;
			case 'Backspace':
				this.handleRemoveNumberClick();
				break;
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
	handleRemoveNumberClick() {
		if(this.state.currentNum != 0 && this.state.currentNum != null) {
			this.setState({ currentNum: this.state.currentNum.slice(0, -1) });
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
				<Grid onClick={i => this.handleNumberClick(i)} onOpClick={x => this.handleOperationClick(x)} clearClick={() => this.clearClick()} clearCurrentClick={() => this.handleRemoveNumberClick()} changeSign={() => this.changeSign()} />
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
				<div className="row">
					<Button value="AC" classVal="top-op" onClick={this.props.clearClick} />
					<Button value="C" classVal="top-op" onClick={this.props.clearCurrentClick} />
					<Button value="+/-" classVal="top-op" onClick={this.props.changeSign} />
					{ this.renderOpButton('/') }
				</div>
				<div className="row">
					{ this.renderButton(7) }
					{ this.renderButton(8) }
					{ this.renderButton(9) }
					{ this.renderOpButton('*') }
				</div>
				<div className="row">
					{ this.renderButton(4) }
					{ this.renderButton(5) }
					{ this.renderButton(6) }
					{ this.renderOpButton('-') }
				</div>
				<div className="row">
					{ this.renderButton(1) }
					{ this.renderButton(2) }
					{ this.renderButton(3) }
					{ this.renderOpButton('+') }
				</div>
				<div className="row">
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
			<button onClick={this.props.onClick} className={this.props.classVal}>
				{this.props.value}
			</button>
		);
	}
}

export default Calculator;