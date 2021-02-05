import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

class ButtonLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount = () => {
		this.submitBtn.focus();
	};

	componentDidUpdate(prevProps) {
		if (this.props.focus) {
			this.submitBtn.focus();
		}
	}
	render() {
		return (
			<Button
				ref={node => {
					this.submitBtn = node;
				}}
				// type={this.props.type}
				// className={this.props.className || ''}
				{...this.props}
				// onClick={this.props.onClick}
				disabled={this.props.disabled || this.props.isLoading}
			>
				{this.props.label} {this.props.isLoading && <span className="spinner" />}
			</Button>
		);
	}
}

export default ButtonLoader;
