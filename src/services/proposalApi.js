import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Proposal"],
  endpoints: (builder) => ({
    proposals: builder.query({
      query: () => ({
        url: "/v1/proposal/",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),
      providesTags: ["Proposal"],
    }),
    updateProposal: builder.mutation({
      query: (proposal) => ({
        url: `/v1/proposal/?proposal_id=${proposal.id}&status=${proposal.status}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),

      invalidatesTags: ['Proposal'],
    }),
  }),
});

export const { useProposalsQuery, useUpdateProposalMutation } = proposalApi;
