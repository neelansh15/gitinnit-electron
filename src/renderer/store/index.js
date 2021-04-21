import { getData } from '../utils'

const data = getData()
const temp_access_token = data.access_token
let access_token = ''
if (temp_access_token != undefined && temp_access_token != '') {
  access_token = temp_access_token
}

export const state = () => ({
  access_token,
  isMusicPlayerVisible: false,
  current_project: getData().current_project // Needed for reactivity in the sidebar
})

export const mutations = {
  setAccessToken (state, payload) {
    state.access_token = payload
  },
  setCurrentProject (state, payload) {
    state.current_project = payload
  },
  toggleMusicPlayer (state) {
    state.isMusicPlayerVisible = !state.isMusicPlayerVisible
  }
}
