export const updateVisible = (isVisible) => {
  return {
    type: 'UPDATE_VISIBLE',
    payload: {
      visible: isVisible,
    },
  }
}
