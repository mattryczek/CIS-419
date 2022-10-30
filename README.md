This update implements support for signing up. Users can be created through the web interface and verified on the backend. The user bar also dynamically shows the currently logged in user, instead of the prefilled static first user as before.

**Full Changelog**: https://github.com/mattryczek/CIS-419/compare/v6.0...v6.1

# Preinstall

This guide assumes MySQL and phpMyAdmin are installed, running, and accessible. Please also install the `gh` utility if you haven't already:

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
gh -R mattryczek/cis-419 release download v6.1 --archive=zip
```

to download the release for this assignment.

# Install and Run (macOS)

`cd` wherever you downloaded the `.zip` of the latest release then

```
unzip CIS-419-6.1.zip
cd CIS-419-6.1
npm install && npm run server
```

In a separate terminal window/tab/session, run

```
npm run client
```

The server will be accessible on the default [`localhost:8000`](https://localhost:8000) location.

Browse to [`localhost:3000/`](http://localhost:3000) to view the now functinonal Graphbook demo.

# Usage
The main page is now a login screen instead of going directly to the posts. Upon supplying a valid username and password the posts are loaded and the user is able to interact with the web app.

# Video Link
[Graphbook Signup Form]()