//common constants
export const SET_ERROR = "setError";
export const SET_LOADING = "setLoading";

//meals mutations
export const SET_MEALS = "setMeals";
export const SET_FOOD = "setFood";
//meals actions
export const GET_LATEST_MEAL_ACTION = "getLatestMeals";
export const GET_FILTERING_MEAL_ACTION = "getFilteringMeals";
export const GET_FOOD_ACTION = "getFoodById";

//categories mutations
export const SET_CATEGORIES = "setCategories";
//categories actions
export const GET_CATEGORIES_ACTION = "getCategories";

//filters mutations
export const SET_SELECTED_CATEGORY = "setSelectedCategory";
export const SET_SELECTED_INGREDIENTS = "setSelectedIngredients";
export const SET_SEARCH_STRING = "setSearchString";
export const SET_INGREDIENT_OPTIONS = "setIngredientOptions";
export const SET_CATEGORY_OPTIONS = "setCategoryOptions";
export const SET_FILTER_TAGS = "setExistingFiltersTags";
//filters actions
export const UPDATE_SELECTED_FILTERS_ACTION = "updateSelectedFilters";
export const UPDATE_FILTER_TAGS_ACTION = "updateExistingFiltersTags";
export const GET_INGREDIENTS_OPTIONS_ACTION = "getIngredientsOptions";
export const GET_CATEGORY_OPTIONS_ACTION = "getCategoryOptions";

//auth mutations
export const LOGIN_SUCCESS = "LoginSuccess";
export const LOGIN_FAILURE = "LoginFailure";
export const LOGOUT = "Logout";
//auth actions
export const LOGIN_ACTION = "DoLogin";
export const LOGOUT_ACTION = "DoLogout";
