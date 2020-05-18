# Snap URL

This tool allows to login to any web resource in an interactive Chrome session and expose the contents securely via an embedded screenshot on a hosted webpage.
This can be used to e.g. display the contents of a login protected area in insecure environments such as public dashboards.

## Install
Copy `.env.example` to `.env` and `npm install`

## Interactive mode
Set the env variable `INTERACTIVE` to `true` and `npm start` and login to the desired `URL` (or any URL actually) in order to acquire necessary session cookies wich are then used to display the URL in the [headless mode](#headless-mode)

## Headless mode
Set the env variable `INTERACTIVE` to `false` and define the target URL via `URL`. Execute `npm start` to run the headless server on the defined `PORT`. Define the desired viewport dimensions via `DISP_W` and `DISP_H`

## Cookies
The session cookies from the [interactive mode](#interactive-mode) are stored in the subfolder `_snapurl-temp` in the [OS temp directory](https://nodejs.org/api/os.html#os_os_tmpdir) and can be deleted via `npm run session:delete`