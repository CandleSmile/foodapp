import { reactive } from "vue";
import { FilterType } from "../const/filterType";

const parseQueryStringToFilters = (query) => {
  let initialFiltersState = {
    [FilterType.CATEGORY]: "",
    [FilterType.SEARCH]: "",
    [FilterType.INGREDIENTS]: "",
  };

  let filters = reactive(initialFiltersState);

  for (let key in query) {
    if (Object.values(FilterType).includes(key)) {
      filters[key] = query[key];
    }
  }
  return filters;
};

const isFiltersChosen = (filters) => {
  filters[FilterType.SEARCH] != "" ||
    filters[FilterType.INGREDIENTS] != "" ||
    filters[FilterType.CATEGORY] != "";
};

export { parseQueryStringToFilters, isFiltersChosen };
