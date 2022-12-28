import { reactive } from "vue";
import { FilterType } from "./const/filterType";
const initialFiltersState = {
  [FilterType.CATEGORY]: "",
  [FilterType.SEARCH]: "",
  [FilterType.INGRIDIENTS]: "",
};

let filters = reactive(initialFiltersState);

const changeFilter = (value, type) => {
  filters[type] = value;
};

const parseQueryStringToFilters = (query) => {
  for (let t in filters) {
    filters[t] = "";
  }
  console.log(filters);
  for (let key in query) {
    if (Object.values(FilterType).includes(key)) {
      changeFilter(query[key], key);
    }
  }
  console.log(filters);
};

const isFiltersChosen =
  filters[FilterType.SEARCH] != "" ||
  filters[FilterType.INGRIDIENTS] != "" ||
  filters[FilterType.CATEGORY] != "";

export { filters, parseQueryStringToFilters, isFiltersChosen };
