export const updateVisible = (isVisible) => {
  return {
    type: 'UPDATE_VISIBLE',
    payload: {
      visible: isVisible,
    },
  }
}
export const addItem = (item, basket) => ({
  type: 'ADD_ITEM',
  payload: { item, basket },
})

export const removeItem = (item, basket) => ({
  type: 'REMOVE_ITEM',
  payload: { item, basket },
})
export const clearAllItems = () => ({
  type: 'CLEAR_ALL_ITEMS',
})
