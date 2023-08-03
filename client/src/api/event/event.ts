import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import baseQuery from "../baseQuery";
import { Session, SignInPayload, SignUpPayload, User } from "./types";

type Empty = Record<string, never>;

export const accountApi = createApi({
  reducerPath: "account",
  baseQuery,
  tagTypes: ["events"],
  endpoints: ({ query, mutation }) => ({
		getEvents: query<{ events: Event[] }, void>({ query: () => `/events`, providesTags: ["events"] }),
    // getAccount: query<{ user: User }, void>({ query: () => `/account`, providesTags: ["user"] }),
    // getSessions: query<{ tokens: Session[] }, void>({
    //   query: () => `/account/sessions`,
    //   providesTags: ["sessions"],
    // }),
  }),
});


export const {  } = accountApi;
