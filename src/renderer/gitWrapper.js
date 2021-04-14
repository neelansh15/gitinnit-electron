const simpleGit = require("simple-git");
const { gitlogPromise } = require("gitlog");
const globalConfig = require("../renderer/utils/index");
const fs = require("fs");

let path;
let githubPath;
let git;
let branchName;

const setPath = () => {
  path = globalConfig.getData().current_project.path;
  console.log(path);
  githubPath = globalConfig.getData().current_project.githubPath;

  git = simpleGit(path);
};
const remote = async () => {
  console.log("remote", githubPath);
  git.addRemote("origin", githubPath);
};

const init = async () => {
  await git.init();
  await remote();
  console.log("init success and check remote");
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

const commit = async text => {
  await git.commit(text);

  console.log("Commit done. Pull next");
  // await git.pull("origin", "master");
  console.log("Pull done. Push next");

  await git.push(["-u", "origin", "master"], () => {
    console.log("push done");
  });
};
const pull = async () => {
  await git.pull("origin", "master");
};
// const push = async () => {
//   await git.push(["-u", "origin", "master"], () => {
//     console.log("push done");
//   });
// };
const config = () => {
  console.log("config");
};

const branch = () => {
  path = globalConfig.getData().current_project.path;
  git = simpleGit(path);
  let branchNames = git.branch(["-a"]);
  console.log(branchNames);
  let branches = git.branchLocal();
  // console.log(branches);
  branches.then((data) => {
    console.log(data)
  })
};
const checkout = async (branchName, commitHash) => {
  path = globalConfig.getData().current_project.path;
  git = simpleGit(path);
  await git.checkout(branchName, commitHash);
  console.log("checkout", branchName);
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

const clone = async (IgithubPath, Ipath) => {
  await fs.mkdir(Ipath, () => {
    console.log("err");
  });
  git = simpleGit(Ipath);
  console.log("clone start");
  await git.clone(IgithubPath, Ipath);
  console.log("clone end");
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
  // push,
  config,
  log,
  setPath,
  clone
};
