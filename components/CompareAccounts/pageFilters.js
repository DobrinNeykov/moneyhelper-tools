import { useRouter } from "next/router";

import slug from "slug";
import queryString from "query-string";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

const pageFilters = (router) => {
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
    return router.query.q || "";
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

  const Query = (query) => {
    query = query || { ...router.query };

    const withParameter = (name, value) => {
      query[name] = value;
      return Query(query);
    };

    const withoutParameter = (name) => {
      delete query[name];
      return Query(query);
    };

    const resetPage = () => {
      query.p = 1;
      return Query(query);
    };

    const toString = () => {
      return "?" + queryString.stringify(query);
    };

    return {
      withParameter,
      withoutParameter,
      resetPage,
      toString,
    };
  };

  const navigateWithoutScrolling = (url) =>
    router.push(url, undefined, { scroll: false });

  return {
    count: count(),
    page: router.query.p ? parseInt(router.query.p) : 1,
    searchQuery: searchQuery(),
    order: router.query.order || "random",
    accountTypes: accountTypes(),
    accountFeatures: accountFeatures(),
    accountAccess: accountAccess(),
    setOrder: (value) =>
      navigateWithoutScrolling(
        Query().withParameter("order", value).resetPage().toString()
      ),
    setFilter: (filter, value) =>
      navigateWithoutScrolling(
        Query().withParameter(slug(filter), value).resetPage().toString()
      ),
    removeFilter: (filter) =>
      navigateWithoutScrolling(
        Query().withoutParameter(slug(filter)).resetPage().toString()
      ),
    removeFilterHref: (filter) =>
      Query().withoutParameter(slug(filter)).resetPage().toString(),
    removeSearchQueryHref: () =>
      Query().withoutParameter("q").resetPage().toString(),
    isFilterActive: (filter) => {
      const activeFilters = [
        ...accountTypes(),
        ...accountFeatures(),
        ...accountAccess(),
      ];
      return activeFilters.includes(filter);
    },
    setSearchQuery: (q) =>
      navigateWithoutScrolling(
        Query().withParameter("q", q).resetPage().toString()
      ),
    setPageHref: (p) => Query().withParameter("p", p).toString(),
  };
};

export default pageFilters;
