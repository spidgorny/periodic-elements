import {h, Component} from "preact";
import './box.less';

export default class Box extends Component<any, any> {

	render() {
		const shortName = this.props.name[0].toUpperCase() +
			this.props.name[1].toLowerCase();
		return (
			<div class={'periodic-box ' + (
				this.props.active
				? 'has-background-success'
				: 'has-background-link')}>
				{shortName}
			</div>
		)
	}
}
