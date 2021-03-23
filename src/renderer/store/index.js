export const state = () => ({
  access_token: ''
})

export const mutations = {
  setAccessToken (state, payload) {
    state.access_token = payload
    // Also set in global config
  }
}
