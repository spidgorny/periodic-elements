import {CoinInfo, ExchangeCoin, ExchangeCoinTable, ExchangeInfo} from "../components/main";
import * as log from "ololog";
import * as _ from 'lodash';

export class CoinExchanges {

	exchanges: ExchangeInfo[];
	coins: CoinInfo[];

	constructor(protected data: ExchangeCoinTable = {}) {

	}

	generate(exchanges: ExchangeInfo[], coins: CoinInfo[]) {
		this.exchanges = exchanges;
		this.coins = coins;
		const coinBase = {};	// starting price for each coin
		const exchangeCoins = {};
		for (let e of this.exchanges) {
			const set = {};
			for (let c of this.coins) {
				coinBase[c.code] = c.code in coinBase
					? coinBase[c.code] : Math.random() * 1000;
				set[c.code] = {
					exchange: e,
					coin: c,
					gain: Math.random() / 49.0,
					lastPrice: coinBase[c.code] + Math.random() * 10 - 5,
					selected: false,
				}
			}
			exchangeCoins[e.code] = set;
		}

		// find min and max
		// log(Object.keys(exchangeCoins));
		for (let c of this.coins) {
			const coinPrices = _.map(exchangeCoins, c.code);
			const coinValues = _.map(coinPrices, 'lastPrice');
			const min = _.min(coinValues).toFixed(3);
			const max = _.max(coinValues).toFixed(3);
			log(c.code, min, max);
			for (let cp of coinPrices) {
				if (cp.lastPrice.toFixed(3) == min) {
					log('cp.min', cp.lastPrice.toFixed(3));
					cp.isMin = true;
				}
				if (cp.lastPrice.toFixed(3) == max) {
					cp.isMax = true;
				}
				exchangeCoins[cp.exchange.code][cp.coin.code] = cp;
			}
		}
		this.data = exchangeCoins;
		return this;
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

}
