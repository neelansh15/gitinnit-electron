
const { app, BrowserWindow } = require("electron");
console.log(typeof BrowserWindow);
const simpleGit = require('simple-git');
const git = simpleGit();
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';

const options: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
};
const git: SimpleGit = simpleGit(options);
const git: SimpleGit = simpleGit('/some/path', { config: ['http.proxy=someproxy'] });
await git.pull();
import simpleGit, { SimpleGit, SimpleGitProgressEvent } from 'simple-git';
const progress = ({method, stage, progress}: SimpleGitProgressEvent) => {
   console.log(`git.${method} ${stage} stage ${progress}% complete`);
}
const git: SimpleGit = simpleGit({baseDir: '/some/path', progress});
await git.pull();
await git.raw('pull', '--progress');
await git.submoduleUpdate('submodule-name', { '--progress': null });
await git.submoduleUpdate('submodule-name', ['--progress']);

const simpleGit = require('simple-git');
const git = simpleGit();

// using promises on each task
	const simpleGit = require('simple-git');
const git = simpleGit();
git.init(onInit).addRemote('master', 'github.com/neelansh15/gitinnit-electron', onRemoteAdd);

function onInit (err, initResult) { }
function onRemoteAdd (err, addRemoteResult) { }

git.init()
  .then(function onInit (initResult) { })
  .then(() => git.addRemote('master', 'github.com/neelansh15/gitinnit-electron'))
  .then(function onRemoteAdd (addRemoteResult) { })
  .catch(err => console.error(err));

// using a promise at the end of the chain to check for failures in any task
git.init().addRemote('origin', 'git@github.com:steveukx/git-js.git')
  .catch(err => console.error(err));


document.getElementById("select").addEventListener("click", () => {



const git: SimpleGit = simpleGit();
const initResult = await git.init();
const addRemoteResult = await git.addRemote('master', 'github.com/neelansh15/gitinnit-electron');
const git = simpleGit()
try {
    await git.init();
    await git.addRemote(name, repoUrl);
}
catch (e) { /* handle all errors here */ }

});