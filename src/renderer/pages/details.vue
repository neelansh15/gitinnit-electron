<template>
  <h1>details</h1>
</template>

<script>

const fs = require('fs')

const directoryPath = 'C:\\Users\\vedant\\Desktop\\testFolder'

const git = require('../gitWrapper')

git.init()
console.log('init')
git.remote()
console.log('remote')

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  git.add(files)
  console.log(files)
})
console.log('add')

git.commit()
console.log('commit')

git.push()
console.log('push')

export default {
}
</script>
