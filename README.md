This is probably the biggest release yet. First and foremost I created a hotfix to amend post ID mismatch -- no matter the logged in user posts were showing as coming from the first user created. Oops! Correct functionality has been restored. Additionally, I implemented a profile page, and added QOL improvements to the UI. Additionally, users can edit their own avatar, username and email from the profile page now.


**Full Changelog**: https://github.com/mattryczek/CIS-419/compare/v7.1...v8

# Preinstall

This guide assumes Minio, MySQL and phpMyAdmin are installed, running, and accessible. Please also install the `gh` utility if you haven't already:

#### macOS (using Homebrew) 
`brew install gh`
#### Windows (using conda)
`conda install gh --channel conda-forge`

You can use gh without authenticating but to log in run

`gh auth login`

and it will take you through the login steps via browser.

# Download

Once `gh` is installed simply run

```
gh -R mattryczek/cis-419 release download v8 --archive=zip
```

to download the release for this assignment.

# Install and Run (macOS)

`cd` wherever you downloaded the `.zip` of the latest release then

```
unzip CIS-419-8.zip
cd CIS-419-8
npm install && npm run server
```

If you run into security issues, remember to `export` your `JWT_TOKEN` and any other necessary credentials.

In a separate terminal window/tab/session, run

```
npm run client
```

The server will be accessible on the default [`localhost:8000`](https://localhost:8000) location.

Browse to [`localhost:3000/`](http://localhost:3000) to view the now functinonal Graphbook demo.

# Usage
Login as in the previous releases using and existing user. Clicking on the "Upload File" button and upload a file. Status can be verified by checking server logs for an eTag from Minio.

# Video Link
[Profile Page Support & Advanced Routing]()