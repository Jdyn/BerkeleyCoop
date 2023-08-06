import React from "react";
import { Channel } from "phoenix";

export const ChannelContext = React.createContext<Channel | null>(null);

export const ChannelProvider = ChannelContext.Provider;

export const useRootChannel = () => {
	const channel = React.useContext(ChannelContext);
	return channel;
}
