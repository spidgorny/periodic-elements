import {h, Component} from "preact";
import {CoinInfo, ExchangeCoin, ExchangeInfo} from "./main";

export default class PriceTable extends Component<any, any> {

	columns = this.props.exchanges;
	rows = this.props.coins;
	exchangeCoins = this.props.exchangeCoins;

	constructor(props) {
		super(props);
		console.log('PriceTable.constructor');
	}

	render() {
		console.log('PriceTable.render', this.columns.length);
		return (
			<table class="table is-fullwidth is-narrow is-separated has-background-black is-size-7">
				<thead>
					<tr class="has-text-grey">
						<td></td>
						{this.columns.map(ex => {
							return <th>{ex.code}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{this.rows.map((coin) => {
						return <tr>
							<td class="has-text-grey">
								{coin.code}
							</td>
							{this.columns.map((ex) => {
								return this.getExchangeCoinCell(ex, coin);
							})}
						</tr>
					})}
				</tbody>
			</table>
		);
	}

	getExchangeCoinCell(ex: ExchangeInfo, coin: CoinInfo) {
		const info = this.exchangeCoins[ex.code][coin.code];
		let klass = '';
		if (info.gain >= 0.02) {
			klass = 'has-background-warning has-text-grey';
		}
		return <td class={klass}>
			<a href="#" >
				{(100*info.gain).toFixed(1)}%
			</a>
		</td>;
	}

	clickCell(info: ExchangeCoin) {

	}

}

