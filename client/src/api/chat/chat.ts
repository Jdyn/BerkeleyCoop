import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

// type Empty = Record<string, never>;

export const chatApi = createApi({
  reducerPath: "chat",
  baseQuery,
  tagTypes: ["rooms"],
  endpoints: ({ query, mutation }) => ({
    // getEvents: query<{ events: any[] }, void>({
    //   query: () => `/events`,
    //   providesTags: ["rooms"],
    // }),
    createRoom: mutation<Record<string, any>, { room: any }>({
      query: (body) => ({
        url: "/rooms",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["rooms"],
    }),
    deleteRoom: mutation<void, number>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["rooms"],
    }),
    getHouses: query<{ houses: any[] }, void>({
      query: () => `/houses`,
    }),
  }),
});

export const { useCreateRoomMutation, useGetHousesQuery } = chatApi;
