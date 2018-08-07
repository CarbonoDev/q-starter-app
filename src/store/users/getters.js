export const currentUser = (state, getters, rootState, rootGetters) => {
  if (state.currentUser) {
    return { ...{ id: state.currentUser.id }, ...state.currentUser.attributes }
  }
  return state.currentUser
}
