import {h, Component} from "preact";
import Box from "./box";
import './exchanges-download.less';
import * as _ from 'lodash';

export default class ExchangesDownload extends Component<any, any> {

	set: {
		code: string;
		active: boolean;
	}[];

	timer: number;

	constructor() {
		super();
		this.setState((prevState, props) => {
			return {
				set: _.range(26).map(i => {
					return String.fromCharCode('A'.charCodeAt(0) + i) +
						String.fromCharCode('a'.charCodeAt(0) + Math.random() * 26);
				}).map(code => {
					return {
						code: code,
						active: false,
					};
				})
			};
		});
	}

	componentDidMount() {
		this.timer = setInterval(this.update.bind(this), 100);
	}

	componentWillUnmount() {
		// stop when not renderable
		clearInterval(this.timer);
	}

	render() {
		return (
			<div class="exchanges-download">
				{this.state.set.map(el =>
					<Box name={el.code} active={el.active}></Box>
				)}
			</div>
		);
	}

	update() {
		const anyKey = Math.floor(Math.random() * this.state.set.length);
		const any = this.state.set[anyKey];
		// console.log(any);
		this.setState((prevState, props) => {
			prevState.set[anyKey].active = Math.random() > 0.5;
			return prevState;
		});
	}

}
