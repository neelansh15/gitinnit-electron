const simpleGit = require("simple-git");
const { gitlogPromise } = require("gitlog");
const globalConfig = require("../renderer/utils/index");

let path;
let githubPath;
let git;

const setPath = () => {
  path = globalConfig.getData.current_project.path;
  console.log(path);
  githubPath = globalConfig.getData.current_project.githubPath;
  git = simpleGit(path);
};

const init = () => {
  git.init();
};

const remote = new Promise(function(resolve, reject) {
  console.log("remote wrapper");

  if (git.addRemote("origin", githubPath)) {
    resolve("ok");
    console.log("ok2");
  } else {
    reject("No");
  }
});

const add = new Promise(function(resolve, reject) {
  console.log("add wrapper");

  reject("NO");
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
  await git.push("origin", "master");
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

// Find the return type of git.log()

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
  setPath
};
