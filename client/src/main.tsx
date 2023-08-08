import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './api/store';
import router from './router';
import { UserProvider } from './hooks/useUser';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<UserProvider>
			<RouterProvider router={router(store)} />
		</UserProvider>
	</Provider>
);
