import { getData } from '../utils'

let data = getData()
let temp_access_token = data.access_token
let access_token = ''
if(temp_access_token != undefined && temp_access_token != ''){
  access_token = temp_access_token
}

export const state = () => ({
  access_token,
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
