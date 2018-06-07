import {h, Component} from "preact";

export default class ExchangeTable extends Component<any, any> {

	columns = this.props.exchanges;

	constructor(props) {
		super(props);
		console.log('ExchangeTable.constructor', props.exchanges.length);
		console.log('ExchangeTable.constructor', this.columns.length);
	}

	render(props, state) {
		console.log('ExchangeTable.render', this.columns.length);
		console.log(props);
		console.log(state);
		return (
			<div>
				<a name="ExchangeTable"></a>
				<h1>Coin: {props.coin.code}</h1>
				<table class="table is-fullwidth is-narrow is-separated has-background-black">
					<thead>
						<tr>
							<td></td>
							{this.columns.map(el => {
								return <th>{el.code}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{this.columns.map((el, i) => {
							return <tr>
								<td>
									{el.code}
								</td>
								{this.columns.map((col, c) => {
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
			</div>
		);
	}

}
