const simpleGit = require('simple-git')

const path = 'C:\\Users\\vedant\\Desktop\\testFolder'
const githubPath = 'https://github.com/devs4shah/Testing1.git'

const git = simpleGit(path)

const init = new Promise(function (resolve, reject) {
  console.log('init wrapper')
  if (git.init()) {
    resolve('ok')
  } else {
    reject('No')
  }
})

const remote = new Promise(function (resolve, reject) {
  console.log('remote wrapper')

  if (git.addRemote('origin', githubPath)) {
    resolve('ok')
    console.log('ok2')
  } else {
    reject('No')
  }
})

const add = new Promise(function (resolve, reject) {
  console.log('add wrapper')

  reject('NO')
  const i = 1
  if (i === 1) {
    resolve('ok')
  }
})

const addFiles = files => {
  console.log('addfiles wrapper')

  files.forEach(file => {
    git.add(file)
    console.log(file)
  })
}

const commit = text => {
  git.commit(text)
}
const pull = async () => {
  await git.pull('origin', 'master')
}
const push = async () => {
  await git.push('origin', 'master')
}
const config = () => {
  console.log('config')
}

const branch = () => {
  console.log('branch')
}
const checkout = () => {
  console.log('checkout')
}

export { init, add, addFiles, commit, remote, branch, checkout, pull, push, config }
