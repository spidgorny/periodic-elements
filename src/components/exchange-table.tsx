import {h, Component} from "preact";

export default class ExchangeTable extends Component<any, any> {

	columns = this.props.exchanges;

	constructor(props) {
		super(props);
		// console.log('ExchangeTable.constructor', props.exchanges.length);
		// console.log('ExchangeTable.constructor', this.columns.length);
	}

	render(props, state) {
		// console.log('ExchangeTable.render', this.columns.length);
		// console.log('props', props);
		// console.log('state', state);
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
									let klass = '';
									if (c < i) {
										klass += " has-background-success";
									}
									return <td class={klass}></td>;
								})}
							</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}

}
