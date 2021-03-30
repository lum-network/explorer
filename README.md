#Lum Network - Explorer

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

This is a front-end repository for **Lum Network Explorer**.

This service used **Lum Network - Chain Bridge** as an API (code hosted [here](https://github.com/lum-network/chain-bridge))

##Description

This service is a React full typescript application with these libraries:

- [Redux](https://react-redux.js.org/) and [Rematch](https://rematchjs.org/)
- [Class-transformer](https://github.com/typestack/class-transformer)
- [Axios](https://github.com/axios/axios)
- [Socket io](https://socket.io/docs/v4/client-api/)

Explorer use [Front-end Elements](https://github.com/lum-network/frontend-elements) as a Git Submodule.

All stylesheets are written in SASS with [Bootstrap 5](https://getbootstrap.com/).

## Installation

### Clone

This project has a git submodule so clone it with:

> $ git clone git@github.com:lum-network/explorer.git --recursive

### Install dependencies

There are two `package.json` in this repository:

> $ yarn && cd src/frontend-elements && yarn && cd ../..

### Running your app

Now you can run your app with:

> $ yarn start

### Building your app

You can build your app with:

> $ yarn build

## Code Style

All React components are functional components with hooks.

There is a Prettier and ES Lint configuration to follow.

##Contributing

All contributions are more than welcome! Feel free to fork the repository and create a Pull Request!
