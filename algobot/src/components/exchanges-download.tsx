import {h, Component} from "preact";
import Box from "./box";
import './exchanges-download.less';

export default class ExchangesDownload extends Component<any, any> {

	timer: number;

	constructor(props) {
		super(props);
		// console.log('ExchangesDownload', props);
		this.setState({
			set: props.exchanges,
		});
	}

	static getDerivedStateFromProps(props, state) {

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			set: nextProps.exchanges,
		});
	}

	componentDidMount() {
		this.timer = setInterval(this.update.bind(this), 100);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		// console.log(this.state);
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
		// const any = this.state.set[anyKey];
		// console.log(any);
		this.setState((prevState, props) => {
			prevState.set[anyKey].active = Math.random() > 0.5;
			return prevState;
		});
	}

}
