import { getData } from '../utils'



export const state = () => ({
  access_token: '',
  current_project: getData().current_project //Needed for reactivity in the sidebar
})

export const mutations = {
  setAccessToken (state, payload) {
    state.access_token = payload
  },
  setCurrentProject(state, payload){
    state.current_project = payload
  }
}
