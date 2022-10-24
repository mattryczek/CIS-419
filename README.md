This update implements support for deleting posts. Some of the codebase was also refactored into React components, for portability.

**Full Changelog**: https://github.com/mattryczek/CIS-419/compare/v4.1...v5.0

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
gh -R mattryczek/cis-419 release download v5.0 --archive=zip
```

to download the release for this assignment.

# Install and Run (macOS)

`cd` wherever you downloaded the `.zip` of the latest release then

```
unzip CIS-419-5.0.zip
cd CIS-419-5.0
npm install && npm run server
```

In a separate terminal window/tab/session, run

```
npm run client
```

The server will be accessible on the default [`localhost:8000`](https://localhost:8000) location.

Browse to [`localhost:3000/`](http://localhost:3000) to view the now functinonal Graphbook demo.

# Usage
New posts can be typed into the text box and posted with the button. Blank posts are allowed too. You can also delete posts by clicking on the dropdown arrow and pressing "Delete".