# Gitinnit?

## ToDo

- [ ] Accessibility: Add titles to as many components as possible
- [ ] Collaborators: List, Add & Remove via Github API **Neelansh**

  - [x] List collaborators
  - [x] Add collaborators
  - [x] Remove collaborators
  - [ ] Check permissions, maybe only the owner or user with admin permission can add/remove collaborators. Also disallow removing owner as collaborator

- [ ] **Important** In the simple-git plugin source code, change branch on init from master to main
- [ ] Change design of Timeline
- [ ] Toggle Terminology switch (Optional) **Neelansh**
- [ ] ComboBox for Github Remote **Parth** : **10th April** **Important**
- [ ] Detect if app is offline, then use offline data from global config instead of fetching it from the Github API
- [x] ~~Global config~~: **Done**, path: %appdata%/pkg.name(here: gitnnit-electron)/globalConfig.json (Read https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e)

- [x] Create wrapper for simple- it (assets/ javascript file): **Vedant**
- [ ] Components
  - [x] pull.vue: **Parth**
    - [x] Use wrapper's simple- git module functions for git pull
    - [x] Vuetify layout
  - [x] push.vue: **Vedant**
    - [x] Primary: Commit Changes, Secondary: Push commits
- [ ] Pages

  - [ ] Intro _Tutorial_
  - [x] index.vue: Latest 3 projects
  - [x] startProject.vue: **Vedant**
    - [ ] Check if a repo with the project name already exists before creating a new repo, or use error while creating repo **Neelansh**
    - [x] Stepper 2: ~~New project / Fetch from Github (clone) and~~ add projectConfig to globalConfig: with _Tutorial_ on how to add user to a repository.
      - [x]Routing + Put in project config **Vedant** : **10th April**
    - [x] After git init, CREATE a new repo (probably org repo) and set as remote **Neelansh**
    - [x] Validation
    - [x] git init (through wrapper)
    - [x] Generate project config file
  - [ ] Account.vue: **Neelansh**
    - [x] Github OAuth Login
  - [x] Timeline.vue: **Parth**
    - [ ] Create new branch command: Local or Local+Remote
    - [ ] Commit Card: &lt;Button&gt; Create new timeline from this point => DialogBox("Name of new timeline")=>Creates new timeline(branch) **Any one**
  - [ ] details.vue: **Neelansh**, **Parth**
    - [ ] Ability to select output file for each commit...wonder how though. Think this through
    - [x] Project details
    - [ ] Timeline
      - [x] Set Default
      - [ ] Create new Timeline (New branch)
    - [ ] Commit message, Go to this place in time **Parth** **Important**

- [x] Username in sidebar **Neelansh**
- [ ] commit function explicitly **Vedant**
- [ ] User config **Vedant** (in wrapper)
- [x] Checkout function **Vedant**
- [ ] Pagination in index.vue for projects **Vedant**
- [x] cloneProject.vue -> setPath for git wrapper **Vedant**
- [ ] Add branch attribute to config for checkout **Neelansh**

## Pre-release

1. startProject.vue:
   - Set private to false by default while creating repo, or even ask user
   - Alter project name used in repo creation for fitting github repo name standards
2. globalConfig.json:
   - Need to encrypt the access_token to prevent leaks to other applications who might misuse it
3. If it is the user's first time running the app, show "No project selected" or "Go to create project" link when no projects found.

## Caveats

1. Github api repo listing limit is max 100 per page. For more than 100 repos, would need pagination (api does provide page by page)

2. Again in repo listing, we are using "owner" affiliation for user-owned repos. For repos the user has been added as a collaborator to, we need to lock the repo in the combobox/dropdown.

3. In Timeline.vue, if we reload timeline after switching to a commit then there is no way to access the upper commits. For that added a "Back to master branch" button. But unless the BranchCombo.vue works, users are stuck with just the master branch fallback.

4. We are forcing git checkout if the user moves between commits. If the user switches to an older commit and wants to have his
   edits saved, that won't be possible. In the future, implement a confirm box to give them the option of "git switch -c" to create
   new branch from this existing commit or overwrite their changes.

## Bugs:

- [ ] Add a new id each time a repo is cloned. Reason: If the same new project is cloned, then two projects with the same ids will exist.

- [ ] **[SOLVED (temp)]** **Severe** If the music is playing or has been played in this session and the user tries to git checkout, then the output files and folders don't change since they are in use by the audio player program and thus the checkout gives an error.  
       _Possible Solution:_ Core issue is that state's music_file_path is not being set to null in details.vue which would trigger v-if and remove
      the audio player component and with it, the file lock.

**Partial Solution**:  
details.vue updated() was calling the function to update file that's why setting to null wasn't working. It was being overwritten immediately.  
Secondly, after checkout it takes some time for git to remove the files/folders changed. So added a delay of 200ms in the
updateOutputFile function. This can be improved by using await to know from git.checkout WHEN the process has been completed.

**FULL SOLUTION**:
In short, every time the music file path updates in state, I copy over the files to a **temporary** folder in appdata! IT WORKS! Now, file lock issues could exist there too if I try to update the temp with new temp output file, so for that I have appended a random number to the filename (ex: output72653.mp3). Even the extension is perfectly copied over :D
The only drawback is that many garbage output files are left over. But no prob the simple issue is to clear the temp output directory on every app restart. Done this on app startup :D.
**BONUS**: Somehow the whole component is re-rendering which means the audio duration is updated by itself! OMG I thought I would have to do more but this is awesome!

### Plugins / References

https://github.com/wilsonwu/vuetify-audio

### Future Plans:

- [ ] Plugin system (AI spliters, DAW)
- [ ] Web page:
  - [ ] Profile Page (instead of langs -> genre)
  - [ ] Login
