This is a starter template for [Learn Next.js](https://nextjs.org/learn), adapted to include a form that is protected using [Friendly Captcha](https://friendlycaptcha.com).

The relevant files to look at:

- [`components/friendlyCaptcha.js`](/components/friendlyCaptcha.js) the Friendly Captcha Widget as a React component.
- [`pages/forms/basic.js`](/pages/forms/basic.js) an example form that is protected with a Friendly Captcha widget.
- [`pages/api/submitBasic.js`](/pages/api/submitBasic.js) the endpoint that receives the data from the above form, it talks to the _siteverify_ endpoint to validate the captcha solution.

## Running the example

- Create a file called `.env.local` with your sitekey and API key:
  ```env
  NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=FCMASQ....
  FRIENDLY_CAPTCHA_API_KEY=A10V6RT9B2...
  ```
- `npm install`
- `npm run dev`
- Open your browser at [`http://localhost:3000`](http://localhost:3000)

## Tips for integrating Friendly Captcha into your own project

### Set up a transpile plugin

The [friendly-challenge](https://github.com/friendlycaptcha/friendly-challenge) library is exported as an ES module. To make Next.js underrstand it we install a plugin:

- Install `next-transpile-modules`
  ```shell
  npm install --save-dev next-transpile-modules
  ```
- Add the following to your `next.config.js`:

  ```javascript
  // Package docs at https://github.com/martpie/next-transpile-modules
  const withTM = require("next-transpile-modules")(["friendly-challenge"]);

  module.exports = withTM({});
  ```

> Next.JS 12 and later will support these kinds of imports without plugins, so in the future this step may not be necessary.

### Supporting very old browsers

If you want to support very old browsers (>4 years old), you sohuld import the compat version of the library. Change all imports from `friendly-challenge` to `friendly-challenge/compat`.
