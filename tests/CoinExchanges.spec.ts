import {CoinExchanges} from "../src/models/CoinExchanges";

describe('CoinExchanges', () => {

	it('constructor', () => {
		new CoinExchanges({
			Kb: {
				BTC: {
					coin: {
						code: 'BTC',
					},
					exchange: {
						code: 'Kb',
						active: false,
					},
					gain: 0.01,
					selected: false,
				}
			}
		});
	});

	it('unselect', () => {
		const ce = new CoinExchanges({
			Kb: {
				BTC: {
					coin: {
						code: 'BTC',
					},
					exchange: {
						code: 'Kb',
						active: false,
					},
					gain: 0.01,
					selected: true,
				}
			}
		});
		ce.unselect();
		expect(ce.get().Kb.BTC.selected).toBe(false);
	});

});
