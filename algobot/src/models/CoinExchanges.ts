import {CoinInfo, ExchangeCoin, ExchangeCoinTable, ExchangeInfo} from "../components/main";
import * as log from "ololog";
import * as _ from 'lodash';

export class CoinExchanges {

	protected exchanges: ExchangeInfo[];
	protected coins: CoinInfo[];
	protected coinBase: {
		[key: string]: number
	};
	protected onUpdate: Function;

	constructor(protected data: ExchangeCoinTable = {}) {
	}

	setCoinBase(coins: CoinInfo[]) {
		const coinBase = {};	// starting price for each coin
		for (let c of coins) {
			coinBase[c.code] = Math.random() * 1000;
		}
		return coinBase;
	}

	generate(exchanges: ExchangeInfo[], coins: CoinInfo[]) {
		this.exchanges = exchanges;
		this.coins = coins;
		const exchangeCoins = {};
		for (let e of this.exchanges) {
			const set = {};
			for (let c of this.coins) {
				set[c.code] = {
					exchange: e,
					coin: c,
					// gain: Math.random() / 49.0,
					lastPrice: this.coinBase[c.code] + Math.random() * 10 - 5,
					selected: false,
				} as ExchangeCoin;
			}
			exchangeCoins[e.code] = set;
		}

		// find min and max
		// log(Object.keys(exchangeCoins));
		for (let c of this.coins) {
			this.setMinMax(exchangeCoins, c);
		}
		this.data = exchangeCoins;
		return this;
	}

	setMinMax(exchangeCoins: ExchangeCoinTable, c: CoinInfo) {
		let coinPrices = _.map(exchangeCoins, c.code);
		coinPrices = _.compact(coinPrices);
		const coinValues = _.map(coinPrices, 'lastPrice');
		const min = _.min(coinValues).toFixed(3);
		const max = _.max(coinValues).toFixed(3);
		// log(c.code, min, max);
		for (let cp of coinPrices) {
			if (cp.lastPrice.toFixed(3) == min) {
				// log('cp.min', cp.lastPrice.toFixed(3));
				cp.isMin = true;
			} else if (cp.lastPrice.toFixed(3) == max) {
				cp.isMax = true;
			} else {
				cp.isMin = false;
				cp.isMax = false;
			}
			exchangeCoins[cp.exchange.code][cp.coin.code] = cp;
		}
	}

	unselect() {
		for (let e in this.data) {
			for (let c in this.data[e]) {
				this.data[e][c].selected = false;
			}
		}
		return this;
	}

	get() {
		return this.data;
	}

	startGeneration(exchanges: ExchangeInfo[], coins: CoinInfo[], onUpdate: Function) {
		this.exchanges = exchanges;
		this.coins = coins;
		this.onUpdate = onUpdate;
		this.coinBase = this.setCoinBase(this.coins);
		setInterval(this.generateOneExchange.bind(this), 1000);
	}

	generateOneExchange() {
		const randomE = Math.floor(Math.random() * this.exchanges.length);
		const e = this.exchanges[randomE];
		for (let c of this.coins) {
			if (!(e.code in this.data)) {
				this.data[e.code] = {};
			}
			this.data[e.code][c.code] = {
				exchange: e,
				coin: c,
				lastPrice: this.coinBase[c.code] + Math.random() * 10 - 5,
				selected: false,
			};
		}
		for (let c of this.coins) {
			this.setMinMax(this.data, c);
		}
		this.onUpdate
			? this.onUpdate()
			: null;
	}

}
