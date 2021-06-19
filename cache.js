import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        animalsVar: {
          read() {
            return animalsVar();
          },
        },
        initialDataLoadVar: {
          read() {
            return initialDataLoad();
          },
        },
      },
    },
  },
});

export const animalsVar = makeVar([]);
export const initialDataLoad = makeVar(false);
