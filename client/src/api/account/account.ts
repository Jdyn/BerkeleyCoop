import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import baseQuery from "../baseQuery";
import { Session, SignInPayload, SignUpPayload, User } from "./types";

type Empty = Record<string, never>;

export const accountApi = createApi({
  reducerPath: "account",
  baseQuery,
  tagTypes: ["user", "sessions"],
  endpoints: ({ query, mutation }) => ({
    getAccount: query<{ user: User }, void>({ query: () => `/account`, providesTags: ["user"] }),
    getSessions: query<{ tokens: Session[] }, void>({
      query: () => `/account/sessions`,
      providesTags: ["sessions"],
    }),
    deleteSession: mutation<Empty, string>({
      query: (trackingId) => ({
        url: `/account/sessions/${trackingId}`,
        method: "DELETE",
      }),
    }),
    clearSessions: mutation<Empty, void>({
      query: () => ({
        url: `/account/sessions/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["sessions"],
    }),
    sendEmailConfirmation: query<Empty, void>({ query: () => "/account/email/confirm" }),
    doEmailConfirmation: mutation<Empty, string>({
      query: (token) => ({
        url: `/account/email/confirmation/${token}`,
        method: "POST",
      }),
    }),
    accountSignUp: mutation<{ user: User }, SignUpPayload>({
      query: (body) => ({
        url: `/account/signup`,
        method: "POST",
        body,
      }),
    }),
    accountSignIn: mutation<{ user: User; token: string }, SignInPayload>({
      query: (body) => ({
        url: "/account/signin",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_payload, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.user) {
            updateSession(data.user, data.token);
          }
        } catch (err) {
          // `onError` side-effect
        }
      },
      invalidatesTags: ["sessions"],
    }),
    accountSignOut: mutation<Empty, void>({
      query: () => ({
        url: "/account/signout",
        method: "DELETE",
      }),
    }),
  }),
});

const updateSession = (user: User, token: string): void => {
  if (user) {
    Cookies.set("user", JSON.stringify({ ...user, token }), { expires: 60 * 60 * 24 * 60 });
  }
};

export const { useAccountSignInMutation, useAccountSignOutMutation } = accountApi;
