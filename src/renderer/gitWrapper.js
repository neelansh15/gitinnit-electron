const fs = require('fs')
const simpleGit = require('simple-git')
const { gitlogPromise } = require('gitlog')
const globalConfig = require('../renderer/utils/index')

let path
let githubPath
let git

const setPath = () => {
  path = globalConfig.getData().current_project.path
  console.log(path)
  githubPath = globalConfig.getData().current_project.githubPath

  git = simpleGit(path)
}
const remote = async () => {
  console.log('remote', githubPath)
  git.addRemote('origin', githubPath)
}

const init = async () => {
  await git.init()
  await remote()
  console.log('init success and check remote')
}

const add = new Promise(function (resolve, reject) {
  console.log('add wrapper')
  const i = 1
  if (i === 1) {
    resolve('ok')
  }
})

const addFiles = async files => {
  console.log('addfiles wrapper')

  await files.forEach(file => {
    git.add(file)
    console.log(file)
  })
}

const commit = async (tfiles, text) => {
  await addFiles(tfiles)
  await git.commit(text)

  console.log('Commit done. Pull next')
  // await git.pull("origin", "master");
  console.log('Pull done. Push next')

  await git.push(['-u', 'origin', 'master'], () => {
    console.log('push done')
  })
}
const pull = async () => {
  await git.pull('origin', 'master')
}
// const push = async () => {
//   await git.push(["-u", "origin", "master"], () => {
//     console.log("push done");
//   });
// };
const config = async (username, email) => {
  await git.addConfig('user.name', username)
  await git.addConfig('user.email', email)
}

const fetch = async () => {
  path = globalConfig.getData().current_project.path
  git = simpleGit(path)
  console.log('fetch start')
  git.fetch('origin').then(data => {
    let i
    for (i in data.branches) {
      console.log(data.branches[i].name)
    }
  })
  // console.log("test", git.fetch("origin"));
  console.log('fetch end')
}

const branch = async () => {
  console.log('branch start')
  await fetch()
  console.log('branch fetch end')
  path = globalConfig.getData().current_project.path
  git = simpleGit(path)
  // let branchNames = git.branch(["-a"]);
  // console.log(branchNames);
  const branches = git.branch()
  // console.log(branches);

  return branches.then(data => {
    console.log(data)
    console.log(data.current)
    console.log('Branch Names: ', data.all)
    return data
  })
}
const checkout = async commitHash => {
  path = globalConfig.getData().current_project.path
  git = simpleGit(path)
  await git.checkout(commitHash)

  // Update in global config too
  const globalConfigData = globalConfig.getData()
  globalConfigData.current_project.branch_name = commitHash
  const projects = globalConfigData.projects
  projects.forEach(project => {
    if (project.id == globalConfigData.current_project.id) {
      project.branch_name = commitHash
    }
  })
  globalConfigData.projects = projects
  globalConfig.setData(globalConfigData)

  console.log('checkout', commitHash)
}

const log = () => {
  const options = {
    repo: globalConfig.getData().current_project.path
  }
  return gitlogPromise(options)
    .then(commits => {
      return commits
    })
    .catch(err => console.log(err))
}

const clone = async (IgithubPath, Ipath) => {
  await fs.mkdir(Ipath, () => {
    console.log('err')
  })
  git = simpleGit(Ipath)
  console.log('clone start')
  await git.clone(IgithubPath, Ipath)
  console.log('clone end')
}

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
  clone,
  fetch
}
