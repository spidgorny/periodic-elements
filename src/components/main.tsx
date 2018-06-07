import { h, Component } from "preact";
import { Provider } from "redux-zero/preact";
import appStore from "../store";
import ExchangesDownload from "./exchanges-download";
import * as _ from 'lodash';
import PriceTable from "./price-table";

interface ExchangeInfo {
	code: string;
	active: boolean;
}

export default class Main extends Component<any, any> {

	exchanges: ExchangeInfo[];

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
	}

	render() {
		console.log('Main', this.exchanges.length);
		return (
			<Provider store={appStore}>
				<div>
					<ExchangesDownload
						exchanges={this.exchanges}></ExchangesDownload>
					<PriceTable columns={this.exchanges}></PriceTable>
				</div>
			</Provider>
		);
	}

}
