import axios from 'axios'
import pkg from '../../../package.json'

const { remote } = require('electron')
const { app } = remote
const fs = require('fs')
const path = require('path')

const getPathToGlobalConfig = () => {
  const appDataPath = app.getPath('appData') + '\\' + pkg.name
  const appDataGlobalConfigPath = appDataPath + '\\globalConfig.json'
  return appDataGlobalConfigPath
}

const getData = () => {
  /**
   * Returns an array of objects
   * objects hold id, name, author, description, genre, daw, folder :folder name, path :path to folder, githubPath
   */
  let globalConfigData
  const appDataGlobalConfigPath = getPathToGlobalConfig()
  if (!fs.existsSync(appDataGlobalConfigPath)) {
    fs.openSync(appDataGlobalConfigPath, 'w+')
    globalConfigData = {}
  } else {
    // Previous globalConfig exists
    globalConfigData = JSON.parse(fs.readFileSync(appDataGlobalConfigPath))
  }
  return globalConfigData
}

const setData = globalConfigData => {
  console.log('SET DATA IN ACTION')
  if (fs.existsSync(getPathToGlobalConfig())) { fs.writeFileSync(getPathToGlobalConfig(), JSON.stringify(globalConfigData)) }
  console.log('SET DATA ENDED')
}

const getCollaborators = async () => {
  const globalConfigData = getData()
  if (globalConfigData) {
    const data = axios({
      url: `https://api.github.com/repos/${globalConfigData.current_project.repo_owner}/${globalConfigData.current_project.name}/collaborators`,
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'token ' + globalConfigData.access_token
      }
    })
    console.log('Data from utils getCollaborators:')
    console.log(data)
    return data
  } else {
    console.error('Async issue in getCollaborators in utils/index.js. config data not set')
    return [false]
  }
}

const getOutputFilePath = () => {
  console.log('getOutputFilePath function CALLED')
  const path = getData().current_project.output_file
  if (fs.existsSync(path)) {
    return path
  }
  return null
}

const copyOutputFileToTemp = (source_file) => {

  
  //Get music file extension by regex
  const extension = path.extname(source_file)
  console.log("EXTENSION: " + extension)
  
  //Adding a random number each time so that file lock on one file does not exist. Need to clean up leftover files regularly though...
  const temp_output_dir = app.getPath('appData') + '\\' + pkg.name + '\\output'
  const temp_output_path =  temp_output_dir + "\\output" + Math.round(Math.random() * 100000) + extension
  
  //Check if the temp /output folder exists or not (causes errors if not, because copyFileSync doens't create the folder)
  if(!fs.existsSync(temp_output_dir)){
    fs.mkdirSync(temp_output_dir)
  }
  
  fs.copyFileSync(source_file, temp_output_path)

  return temp_output_path
}

const clearTempOutputDir = () => {
  //Asynchronously clear temporary output files generated by the audio player upon app startup
  const temp_output_dir = app.getPath('appData') + '\\' + pkg.name + '\\output'

  fs.readdir(temp_output_dir, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(temp_output_dir, file), err => {
        if (err) throw err;
      });
    }
  });
}

export { getPathToGlobalConfig, getData, setData, getCollaborators, getOutputFilePath, copyOutputFileToTemp, clearTempOutputDir }
