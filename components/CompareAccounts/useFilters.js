import { useRouter } from "next/router";

import slug from "slug";
import queryString from "query-string";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

const useFilters = (name, value) => {
  const router = useRouter();

  const accountTypes = () => {
    const types = listAccountTypes();
    return types.filter((t) => !!router.query[slug(t)]);
  };

  const accountFeatures = () => {
    const features = listAccountFeatures();
    return features.filter((f) => !!router.query[slug(f)]);
  };

  const accountAccess = () => {
    const access = listAccountAccess();
    return access.filter((a) => !!router.query[slug(a)]);
  };

  const searchQuery = () => {
    return router.query.q;
  };

  const count = () => {
    let result = 0;

    if (searchQuery()) {
      result++;
    }
    result += accountTypes().length;
    result += accountFeatures().length;
    result += accountAccess().length;

    return result;
  };

  return {
    count: count(),
    page: router.query.p ? parseInt(router.query.p) : 1,
    searchQuery: searchQuery(),
    order: router.query.order || "random",
    accountTypes: accountTypes(),
    accountFeatures: accountFeatures(),
    accountAccess: accountAccess(),
    setOrder: (value) => {
      const query = { ...router.query };
      query.order = value;

      router.push("?" + queryString.stringify(query));
    },
    setFilter: (filter, value) => {
      const query = { ...router.query };
      query[slug(filter)] = value;

      router.push("?" + queryString.stringify(query));
    },
    removeFilter: (filter) => {
      const query = { ...router.query };
      delete query[slug(filter)];

      router.push("?" + queryString.stringify(query));
    },
    removeFilterHref: (filter) => {
      const query = { ...router.query };
      delete query[slug(filter)];

      return "?" + queryString.stringify(query);
    },
    removeSearchQueryHref: () => {
      const query = { ...router.query };
      delete query["q"];

      return "?" + queryString.stringify(query);
    },
    isFilterActive: (filter) => {
      const activeFilters = [
        ...accountTypes(),
        ...accountFeatures(),
        ...accountAccess(),
      ];
      return activeFilters.includes(filter);
    },
    setSearchQuery: (q) => {
      const query = { ...router.query };
      query.q = q;

      router.push("?" + queryString.stringify(query));
    },
    setPageHref: (page) => {
      const query = { ...router.query };
      query.p = page;

      return "?" + queryString.stringify(query);
    },
  };
};

export default useFilters;
