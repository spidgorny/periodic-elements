import {h, Component} from "preact";

export default class PriceTable extends Component<any, any> {

	columns = this.props.exchanges;

	constructor(props) {
		super(props);
		console.log('PriceTable.constructor');
	}

	render() {
		console.log('PriceTable.render', this.props.columns.length);
		return (
			<table class="table is-fullwidth is-narrow is-separated has-background-black">
				<thead>
					<tr>
						<td></td>
						{this.props.columns.map(el => {
							return <th>{el.code}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{this.props.columns.map((el, i) => {
						return <tr>
							<td>
								{el.code}
							</td>
							{this.props.columns.map((col, c) => {
								if (c < i) {
									return <td class="has-background-success"></td>;
								} else {
									return <td></td>;
								}
							})}
						</tr>
					})}
				</tbody>
			</table>
		);
	}

}
