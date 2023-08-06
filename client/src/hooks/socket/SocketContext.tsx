import React, { useEffect, useState } from "react";
import { Socket, SocketConnectOption } from "phoenix";

export const SocketContext = React.createContext<Socket | null>(null);

interface Props {
	children: React.ReactNode;
	options?: SocketConnectOption;
	url: string;
}

export function SocketProvider({ children, options, url }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = new Socket(url, options);
    s.connect();
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [options, url]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
