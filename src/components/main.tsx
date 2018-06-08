import {h, Component} from "preact";
import {Provider} from "redux-zero/preact";
import appStore from "../store";
import ExchangesDownload from "./exchanges-download";
import * as _ from 'lodash';
import PriceTable from "./price-table";
import ExchangeTable from "./exchange-table";
import {CoinExchanges} from "../models/CoinExchanges";

export interface ExchangeInfo {
	code: string;
	active: boolean;
}

export interface CoinInfo {
	code: string;
}

export interface ExchangeCoin {
	exchange: ExchangeInfo;
	coin: CoinInfo;
	gain: number;
	lastPrice: number;
	selected: boolean;
	isMin: boolean;
	isMax: boolean;
}

export interface ExchangeCoinTable {
	[key: string]: {
		[key: string]: ExchangeCoin;
	}
}

export default class Main extends Component<any, any> {

	exchanges: ExchangeInfo[];

	coins: CoinInfo[];

	exchangeCoins: ExchangeCoinTable;

	constructor() {
		super();
		this.exchanges = _.range(26).map(i => {
			return String.fromCharCode('A'.charCodeAt(0) + i) +
				String.fromCharCode('a'.charCodeAt(0) + Math.random() * 26);
		}).map(code => {
			return {
				code: code,
				active: false,
			};
		});

		this.coins = _.range(50).map(i => {
			return {
				code: String.fromCharCode('A'.charCodeAt(0) +
					Math.random() * 26) +
					String.fromCharCode('A'.charCodeAt(0) +
						Math.random() * 26) +
					String.fromCharCode('A'.charCodeAt(0) +
						Math.random() * 26),
			};
		});

		const ec = new CoinExchanges();
		ec.generate(this.exchanges, this.coins);
		this.exchangeCoins = ec.get();
	}

	render() {
		console.log('Main', this.exchanges.length);
		return (
			<Provider store={appStore}>
				<div>
					<ExchangesDownload
						exchanges={this.exchanges}/>
					<PriceTable
						exchanges={this.exchanges}
						coins={this.coins}
						exchangeCoins={this.exchangeCoins}
					/>
				</div>
			</Provider>
		);
	}

}
