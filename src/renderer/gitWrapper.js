const simpleGit = require('simple-git')

const path = 'C:\\Users\\vedant\\Desktop\\testFolder'
const githubPath = 'https://github.com/devs4shah/Testing1.git'

const git = simpleGit(path)

const init = async () => {
  try {
    await git.init()
      .then(console.log('init'))
  } catch (e) {
    console.log(e)
  }
}
const add = files => {
  files.forEach(file => {
    git.add(file)
  })
}
const commit = () => {
  git.commit('test')
}
const pull = async () => {
  await git.pull()
}
const push = async () => {
  await git.push('origin', 'main')
}
const config = () => {
  console.log('config')
}
const remote = async () => {
  await git.addRemote('origin', githubPath)
    .then(console.log('wrapper remote'))
}
const branch = () => {
  console.log('branch')
}
const checkout = () => {
  console.log('checkout')
}

export { init, add, commit, remote, branch, checkout, pull, push, config }
