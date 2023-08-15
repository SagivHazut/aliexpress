import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  category_ids: '',
  name: '',
  searchRes: [],
  visible: true,
  selectedItemsLeft: [],
  selectedItemsRight: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PARAMS':
      return {
        ...state,
        category_ids: action.payload.category_ids,
        name: action.payload.name,
      }
    case 'UPDATE_SEARCH_RES':
      return {
        ...state,
        searchRes: action.payload.searchRes,
      }
    case 'UPDATE_VISIBLE':
      return {
        ...state,
        visible: action.payload.visible,
      }
    case 'ADD_ITEM':
      const { item, basket } = action.payload
      return {
        ...state,
        [basket]: [...state[basket], item],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        [action.payload.basket]: state[action.payload.basket].filter(
          (selectedItem) => selectedItem !== action.payload.item
        ),
      }
    case 'CLEAR_ALL_ITEMS':
      return {
        ...state,
        selectedItemsLeft: [],
        selectedItemsRight: [],
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)
