# UK car valuation

Simple command line tools to print used car mot history and valuation.

## Installation

```bash
bash ./scripts/setup.sh
```

## To Start

You have to got Chrome running in debug mode. [Ref](https://dev.to/sonyarianto/how-to-use-playwright-with-externalexisting-chrome-4nf1)

You can get installation path by visiting: [Chrome version](chrome://version/)

In my case it is: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

Run following command to get Chrome running in debug mode:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222
```

You should see something like this:

```text
DevTools listening on ws://127.0.0.1:9222/devtools/browser/fd751190-fb93-4ce7-8268-85c28e0fe498
````

Then you can run the following command to start the application:

```bash
node ./src/index.js registrationPlate runningMiles
```
