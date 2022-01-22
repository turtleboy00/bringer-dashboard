import { Route, Routes } from 'react-router-dom';
import Tracking from './containers/Tracking';
import EbayRouter from './ebay';
import UpsRouter from './ups';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            JwtRouter: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const DeliveryRouter = () => {

	return (
		<Routes>
			<Route path="ebay/*" element={ <EbayRouter /> }/>
			<Route path="ups/*" element={ <UpsRouter /> }/>
            <Route path="tracking" element={<Tracking />} />
		</Routes>
	)
}

export default DeliveryRouter;