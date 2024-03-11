'use client';

import { ContentLoader } from "@/components/shared/loaders";
import store, { persistor } from "@/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }) {
	return (
		<Provider store={store}>
			<PersistGate loading={<ContentLoader />} persistor={persistor}>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				{children}
			</PersistGate>
		</Provider>
	);
}
