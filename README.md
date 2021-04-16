# Gitinnit?

## ToDo

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
           Routing + Put in project config **Vedant** : **10th April**
    - [x] After git init, CREATE a new repo (probably org repo) and set as remote **Neelansh**
    - [x] Validation
    - [x] git init (through wrapper)
    - [x] Generate project config file
  - [ ] Account.vue: **Neelansh**
    - [x] Github OAuth Login
  - [x] Timeline.vue: **Parth**
    - [ ] Create new branch command: Local or Local+Remote
  - [ ] details.vue: **Neelansh**, **Parth**
    - [x] Project details
    - [ ] Timeline
      - [x] Set Default
      - [ ] Create new Timeline (New branch)
    - [ ] Commit message, Go to this place in time **Parth** **Important**

- [x] Username in sidebar **Neelansh**
- [ ] commit function explicitly **Vedant**
- [ ] Checkout function **Vedant**
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

## Bugs:

- [ ] Add a new id each time a repo is cloned. Reason: If the same new project is cloned, then two projects with the same ids will exist.

## Wrapper **Vedant**

- [ ] Config
- [ ] Init
- [ ] Add remote
- [x] Add
- [x] Commit
- [x] Push
- [x] Pull
- [x] Clone
- [ ] log
- [ ] branch
- [ ] checkout
