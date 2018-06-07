import {h, Component} from "preact";
import {CoinInfo, ExchangeCoin, ExchangeCoinTable, ExchangeInfo} from "./main";
import ExchangeTable from "./exchange-table";

export default class PriceTable extends Component<any, any> {

	columns = this.props.exchanges;
	rows = this.props.coins;
	// exchangeCoins = this.props.exchangeCoins;

	constructor(props) {
		super(props);
		console.log('PriceTable.constructor');
		this.setState({
			showExchangeTable: false,
			exchangeCoins: props.exchangeCoins,
		});
	}

	render() {
		console.log('PriceTable.render', this.columns.length);
		return (
			<div>
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
				{this.state.showExchangeTable ?
					<ExchangeTable
						exchanges={this.columns}
						coin={this.state.coin}
					/> : null
				}
			</div>
		);
	}

	getExchangeCoinCell(ex: ExchangeInfo, coin: CoinInfo) {
		const info: ExchangeCoin = this.state.exchangeCoins[ex.code][coin.code];
		let klass = '';
		if (info.gain >= 0.02) {
			klass = 'has-background-warning has-text-grey';
		}
		if (info.selected) {
			klass = ' has-background-primary';
		}
		return <td class={klass}>
			<a href="#" onClick={e => this.clickCell(e, info)}>
				{(100 * info.gain).toFixed(1)}%
			</a>
		</td>;
	}

	clickCell(event: Event, info: ExchangeCoin) {
		event.preventDefault();
		const exchangeCoins = this.state.exchangeCoins;
		// unselect
		for (let e in Object.keys(exchangeCoins)) {
			exchangeCoins[e] = exchangeCoins[e].map(set => {
				return Object.assign(set, {
					selected: false,
				});
			});
		}

		exchangeCoins[info.exchange.code][info.coin.code].selected = true;
		this.setState({
			showExchangeTable: true,
			coin: info.coin,
			exchangeCoins,
		});
		document.location.hash = 'ExchangeTable';
		// window.scrollTo();
	}

}

