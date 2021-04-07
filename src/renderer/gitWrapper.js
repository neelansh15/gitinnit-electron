const simpleGit = require("simple-git");
const { gitlogPromise } = require("gitlog");
const globalConfig = require("../renderer/utils/index");

let path;
let githubPath;
let git;

const setPath = () => {
  path = globalConfig.getData().current_project.path;
  console.log(path);
  githubPath = globalConfig.getData().current_project.githubPath;
  git = simpleGit(path);
};
const remote = () => {
  git.addRemote("origin", githubPath);
};

const init = () => {
  git.init();
  git.remote();
};

const add = new Promise(function(resolve, reject) {
  console.log("add wrapper");

  reject("cant add files");
  const i = 1;
  if (i === 1) {
    resolve("ok");
  }
});

const addFiles = files => {
  console.log("addfiles wrapper");

  files.forEach(file => {
    git.add(file);
    console.log(file);
  });
};

const commit = text => {
  git.commit(text);
};
const pull = async () => {
  await git.pull("origin", "master");
};
const push = async () => {
  await git.push(["-u", "origin", "master"], () => {
    console.log("push done");
  });
};
const config = () => {
  console.log("config");
};

const branch = () => {
  console.log("branch");
};
const checkout = () => {
  console.log("checkout");
};

const log = () => {
  const options = {
    repo: globalConfig.getData().current_project.path
  };
  return gitlogPromise(options)
    .then(commits => {
      return commits;
    })
    .catch(err => console.log(err));
};

const clone = () => {
  git.clone(githubPath, path);
};

export {
  init,
  add,
  addFiles,
  commit,
  remote,
  branch,
  checkout,
  pull,
  push,
  config,
  log,
  setPath,
  clone
};
