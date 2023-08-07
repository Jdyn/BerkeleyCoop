import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

// type Empty = Record<string, never>;

export const eventApi = createApi({
  reducerPath: "event",
  baseQuery,
  tagTypes: ["events"],
  endpoints: ({ query, mutation }) => ({
    getEvents: query<{ events: any[] }, void>({
      query: () => `/events`,
      providesTags: ["events"],
    }),
    createEvent: mutation<{ event: any }, { event: any }>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),
    deleteEvent: mutation<void, number>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const { useCreateEventMutation, useGetEventsQuery, useDeleteEventMutation } = eventApi;
