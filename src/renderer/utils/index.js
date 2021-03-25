import pkg from "../../../package.json";

const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");

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

const setData = (globalConfigData) => {
  if(fs.existsSync(getPathToGlobalConfig()))
    fs.writeFileSync(getPathToGlobalConfig(), JSON.stringify(globalConfigData))
}

export { getPathToGlobalConfig, getData, setData };
