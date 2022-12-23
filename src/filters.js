import { reactive } from "vue";
import { FilterType } from "./const/filterType";
const initialFiltersState = {
  [FilterType.CATEGORY]: [],
  [FilterType.SEARCH]: "",
  [FilterType.INGRIDIENTS]: [],
};

let filters = reactive(initialFiltersState);

const deleteFilter = (value, type) => {
  type == FilterType.SEARCH
    ? (filters[type] = "")
    : (filters[type] = filters[type].filter((obj) => obj != value));
};

const addFilter = (value, type) => {
  type == FilterType.SEARCH
    ? (filters[type] = value)
    : filters[type].push(value);
};

const clearFilters = () => {
  filters[[FilterType.CATEGORY]] = reactive([]);
  filters[[FilterType.INGRIDIENTS]].value = reactive([]);
  filters[[FilterType.SEARCH]] = reactive([""]);
};

const parseQueryStringToFilters = (query) => {
  clearFilters();
  for (let key in query) {
    if (Object.values(FilterType).includes(key)) {
      addFilter(query[key], key);
    }
  }
};

const isFiltersChosen =
  filters[FilterType.SEARCH] != "" ||
  filters[FilterType.INGRIDIENTS].length > 0 ||
  filters[FilterType.CATEGORY].length > 0;
export {
  filters,
  deleteFilter,
  addFilter,
  clearFilters,
  parseQueryStringToFilters,
  isFiltersChosen,
};
