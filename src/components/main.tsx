import { h, Component } from "preact";
import { Provider } from "redux-zero/preact";
import appStore from "../store";
import ExchangesDownload from "./exchanges-download";

export default class Main extends Component<any, any> {

	render() {
		return (
			<Provider store={appStore}>
				<ExchangesDownload></ExchangesDownload>
			</Provider>
		);
	}

}
