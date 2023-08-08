import React, { useEffect, useState } from 'react';
import { Socket } from 'phoenix';
import { useGetAccountQuery } from '../../api/account/account';

export const SocketContext = React.createContext<Socket | null>(null);

interface Props {
	children: React.ReactNode;
	url: string;
}

export function SocketProvider({ children, url }: Props) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { data } = useGetAccountQuery();

	useEffect(() => {
		if (data?.token) {
			const s = new Socket(url, { params: { token: data?.token } });
			s.connect();
			setSocket(s);

			return () => {
				s.disconnect();
				setSocket(null);
			};
		}

		return () => {};
	}, [data?.token, url]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
