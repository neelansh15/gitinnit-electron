# Gitinnit?

## ToDo

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
    - [ ] Stepper 2: ~~New project / Fetch from Github (clone) and~~ add projectConfig to globalConfig: with _Tutorial_ on how to add user to a repository.  
    Routing + Put in project config **Vedant** : **10th April**
    - [ ] After git init, CREATE a new repo (probably org repo) and set as remote **Neelansh**
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

- [ ] Username in sidebar **Neelansh**
- [ ] commit function explicitly **Vedant**
- [ ] Checkout function **Vedant**
- [ ] Pagination in index.vue for projects **Vedant**
- [ ] cloneProject.vue -> setPath for git wrapper **Vedant**
