import pkg from "../../../package.json";

const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");

import axios from "axios";

const getPathToGlobalConfig = () => {
  const appDataPath = app.getPath("appData") + "\\" + pkg.name;
  const appDataGlobalConfigPath = appDataPath + "\\globalConfig.json";
  return appDataGlobalConfigPath;
};

const getData = () => {
  /**
   * Returns an array of objects
   * objects hold id, name, author, description, genre, daw, folder :folder name, path :path to folder, githubPath
   */
  let globalConfigData;
  let appDataGlobalConfigPath = getPathToGlobalConfig();
  if (!fs.existsSync(appDataGlobalConfigPath)) {
    fs.openSync(appDataGlobalConfigPath, "w+");
    globalConfigData = {};
  } else {
    // Previous globalConfig exists
    globalConfigData = JSON.parse(fs.readFileSync(appDataGlobalConfigPath));
  }
  return globalConfigData;
};

const setData = globalConfigData => {
  console.log("SET DATA IN ACTION");
  if (fs.existsSync(getPathToGlobalConfig()))
    fs.writeFileSync(getPathToGlobalConfig(), JSON.stringify(globalConfigData));
  console.log("SET DATA ENDED");
};

const getCollaborators = async () => {
  let globalConfigData = getData();
  if (globalConfigData) {
    const data = axios({
      url: `https://api.github.com/repos/${globalConfigData.current_project.repo_owner}/${globalConfigData.current_project.name}/collaborators`,
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + globalConfigData.access_token
      }
    })
    console.log("Data from utils getCollaborators:")
    console.log(data)
    return data
  }
  else{
    console.error("Async issue in getCollaborators in utils/index.js. config data not set")
    return [false]
  }
};

const getOutputFilePath = () => {
  console.log("getOutputFilePath function CALLED")
  let path = getData().current_project.output_file
  if(fs.existsSync(path)){
    return path
  }
  return null
}

export { getPathToGlobalConfig, getData, setData, getCollaborators, getOutputFilePath };
