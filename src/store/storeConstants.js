//common constants
export const SET_ERROR = "setError";
export const SET_LOADING = "setLoading";
export const ERROR = "error";
export const LOADING = "loading";

//meals mutations
export const SET_MEALS = "setMeals";
export const SET_FOOD = "setFood";
export const SET_QUANTITY_OF_MEAL = "setMealQuantityInList";
//meals actions
export const GET_LATEST_MEAL_ACTION = "getLatestMeals";
export const GET_FILTERING_MEAL_ACTION = "getFilteringMeals";
export const GET_FOOD_ACTION = "getFoodById";
export const UPDATE_QUANTITY_OF_MEAL_ACTION = "updateMealQuantityInList";

//meals getters
export const MEALS = "Meals";
export const FOOD = "FoodData";

//categories mutations
export const SET_CATEGORIES = "setCategories";
//categories actions
export const GET_CATEGORIES_ACTION = "getCategories";
//categories getters
export const CATEGORIES = "categories";

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
export const UPDATE_SELECTED_CATEGORY_ACTION = "updateSelectedCategory";
export const UPDATE_SELECTED_INGREDIENTS_ACTION = "updateSelectedIngredients";
export const UPDATE_SEARCH_ACTION = "updateSearchString";
//filters getters
export const INGREDIENT_OPTIONS = "ingredientOptions";
export const CATEGORY_OPTIONS = "categoryOptions";
export const SELECTED_CATEGORY = "selectedCategory";
export const SELECTED_INGREDIENTS = "selectedIngredients";
export const SEARCH_STRING = "searchString";
export const FILTER_TAGS = "filtersTags";

//auth mutations
export const LOGIN_SUCCESS = "LoginSuccess";
export const LOGIN_FAILURE = "LoginFailure";
export const LOGOUT = "Logout";
//auth actions
export const LOGIN_ACTION = "DoLogin";
export const LOGOUT_ACTION = "DoLogout";
//auth getters
export const LOGGED_IN = "loggedIn";
export const USER = "user";

//shop mutations
export const ADD_MEAL_TO_CART = "addMealToCart";
export const CHANGE_MEAL_QUANTITY = "changeMealQuantityInCart";
export const SET_CHECKOUT_STATUS = "setCheckoutStatus";
//shop getters
export const MEALS_IN_CART = "mealsInCart";
export const CART_TOTAL_PRICE = "total_Price";
export const CART_COUNT = "total_Cart";

//shop actions
export const ADD_TO_CART_ACTION = "addToCartAction";
