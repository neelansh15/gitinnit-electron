const simpleGit = require('simple-git')

const path = 'C:\\Users\\vedant\\Desktop\\testFolder'
const githubPath = 'https://github.com/devs4shah/Testing1'

const git = simpleGit(path, { config: [githubPath] })

const init = async () => {
  await git.init()
  console.log('init')
  await git.add('test.txt')
}
const add = () => {
  console.log('add')
}
const commit = () => {
  console.log('commit')
}
const pull = () => {
  console.log('pull')
}
const push = () => {
  console.log('push')
}
const config = () => {
  console.log('config')
}
const remote = () => {
  console.log('remote')
}
const branch = () => {
  console.log('branch')
}
const checkout = () => {
  console.log('checkout')
}

export { init, add, commit, remote, branch, checkout, pull, push, config }
