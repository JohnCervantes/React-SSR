import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        readState: {
          read() {
            return state();
          },
        }
      },
    },
  },
});

export const state = makeVar({
  initialLoad:false,
  animals:[],
  showModal: false,
  showSpinner: false
});
