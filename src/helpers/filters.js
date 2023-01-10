import { FilterType } from "../const/filterType";

const parseQueryStringToFilters = (query) => {
  let filters = {
    [FilterType.CATEGORY]: "",
    [FilterType.SEARCH]: "",
    [FilterType.INGREDIENTS]: "",
  };

  for (let key in query) {
    if (Object.values(FilterType).includes(key)) {
      filters[key] = query[key];
    }
  }
  return filters;
};

export { parseQueryStringToFilters };
