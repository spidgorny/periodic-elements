import {ExchangeCoin, ExchangeCoinTable} from "../components/main";
import * as log from "ololog";

export class CoinExchanges {

	constructor(protected data: ExchangeCoinTable) {

	}

	unselect() {
		for (let e in this.data) {
			for (let c in this.data[e]) {
				this.data[e][c].selected = false;
			}
		}
	}

	get() {
		return this.data;
	}

}
