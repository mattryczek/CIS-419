This update adds support for arbitrary file uploads. After logging in users will be able to see the upload file button. Clicking this brings up a modal similar to the avatar update one. Files can be dragged and dropped or chosen with the system file picker. Currently the files are not used or shown, but successfully upload and are stored in the Minio bucket.

**Full Changelog**: https://github.com/mattryczek/CIS-419/compare/v7.0...v7.1

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
gh -R mattryczek/cis-419 release download v7.1 --archive=zip
```

to download the release for this assignment.

# Install and Run (macOS)

`cd` wherever you downloaded the `.zip` of the latest release then

```
unzip CIS-419-7.1.zip
cd CIS-419-7.1
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
[Image Upload]()