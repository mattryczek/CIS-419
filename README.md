This release implements SSR rendering. It is a basic implementation and the only path the server can render for now is the public paths, which is just the login page. Auth + SSR coming soon to a release near you.

**Full Changelog**: https://github.com/mattryczek/CIS-419/compare/v8...v9.0

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
gh -R mattryczek/cis-419 release download v9.0 --archive=zip
```

to download the release for this assignment.

# Install and Run (macOS)

`cd` wherever you downloaded the `.zip` of the latest release then

```
unzip CIS-419-9.0.zip
cd CIS-419-9.0
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
Instead of running the client it suffices to only run the server. Browse to [`localhost:8000`](https://localhost:8000) and verify only the HTML of `template.js` is being emitted and rendered.

# Video Link
[SSR]()