import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './api/store';
import router from './router';
import { UserProvider } from './hooks/useUser';
import { SocketProvider } from './hooks/socket/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<UserProvider>
			<SocketProvider url="ws://localhost:4000/socket">
				<RouterProvider router={router(store)} />
			</SocketProvider>
		</UserProvider>
	</Provider>
);
