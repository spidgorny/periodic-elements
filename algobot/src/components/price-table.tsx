import {h, Component} from "preact";
import {CoinInfo, ExchangeCoin, ExchangeCoinTable, ExchangeInfo} from "./main";
import ExchangeTable from "./exchange-table";
import * as log from 'ololog';
import {CoinExchanges} from "../models/CoinExchanges";
import * as _ from 'lodash';

export default class PriceTable extends Component<any, any> {

	columns = this.props.exchanges;
	rows = this.props.coins;
	// exchangeCoins = this.props.exchangeCoins;

	constructor(props) {
		super(props);
		// console.log('PriceTable.constructor');
		this.setState({
			showExchangeTable: false,
			exchangeCoins: props.exchangeCoins,
		});
		props.refMain.bindToModelUpdates(this);
	}

	render() {
		// console.log('PriceTable.render', this.columns.length);
		return (
			<div>
				<table class="table is-fullwidth is-narrow is-separated has-background-black is-size-7">
					<thead>
					<tr class="has-text-grey">
						<td>coin</td>
						<td>diff</td>
						<td>%</td>
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
							<td class="has-text-grey">
								{this.getDiff(coin).toFixed(3)}
							</td>
							<td class="has-text-grey">
								{(100*this.getGain(coin)).toFixed(3)}%
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
		if (!(ex.code in this.state.exchangeCoins)) {
			return <td></td>;
		}
		const info: ExchangeCoin = this.state.exchangeCoins[ex.code][coin.code];
		let klass = 'has-text-right';
		// if (info.gain >= 0.02) {
		// 	klass += ' has-background-warning has-text-grey';
		// }
		if (info.selected) {
			klass += ' has-background-primary';
		}

		let aClass = '';
		if (info.isMin) {
			aClass += ' has-text-danger';
		}
		if (info.isMax) {
			aClass += ' has-text-success';
		}
		return <td class={klass}>
			<a href="#" class={aClass} onClick={e => this.clickCell(e, info)}>
				{/*{(100 * info.gain).toFixed(1)}%*/}
				{info.lastPrice.toFixed(2)}
			</a>
		</td>;
	}

	clickCell(event: Event, info: ExchangeCoin) {
		event.preventDefault();

		// unselect
		const ce = new CoinExchanges(this.state.exchangeCoins);
		ce.unselect();
		const exchangeCoins = ce.get();

		// select
		exchangeCoins[info.exchange.code][info.coin.code].selected = true;
		this.setState({
			showExchangeTable: true,
			coin: info.coin,
			exchangeCoins,
		});

		// document.location.hash = 'ExchangeTable';
		// window.scrollTo();
	}

	getDiff(coin: CoinInfo) {
		const coinRow = _.map(this.state.exchangeCoins, coin.code);
		const min = _.find(coinRow, (info: ExchangeCoin) => info.isMin);
		const max = _.find(coinRow, (info: ExchangeCoin) => info.isMax);
		if (min && max && min !== max) {
			return max.lastPrice - min.lastPrice;
		}
		return 0;
	}

	getGain(coin: CoinInfo) {
		const coinRow = _.map(this.state.exchangeCoins, coin.code);
		const min = _.find(coinRow, (info: ExchangeCoin) => info.isMin);
		const max = _.find(coinRow, (info: ExchangeCoin) => info.isMax);
		if (min && max && min !== max) {
			return (max.lastPrice / min.lastPrice) - 1;
		}
		return 0;
	}

}

