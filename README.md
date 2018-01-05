[![npm](https://img.shields.io/npm/v/test-step.svg)](https://www.npmjs.com/package/test-step)
[![Greenkeeper](https://badges.greenkeeper.io/Kronos-Integration/test-step.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/Kronos-Integration/test-step)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://secure.travis-ci.org/Kronos-Integration/test-step.png)](http://travis-ci.org/Kronos-Integration/test-step)
[![bithound](https://www.bithound.io/github/Kronos-Integration/test-step/badges/score.svg)](https://www.bithound.io/github/Kronos-Integration/test-step)
[![codecov.io](http://codecov.io/github/Kronos-Integration/test-step/coverage.svg?branch=master)](http://codecov.io/github/Kronos-Integration/test-step?branch=master)
[![Coverage Status](https://coveralls.io/repos/Kronos-Integration/test-step/badge.svg)](https://coveralls.io/r/Kronos-Integration/test-step)
[![Known Vulnerabilities](https://snyk.io/test/github/Kronos-Integration/test-step/badge.svg)](https://snyk.io/test/github/Kronos-Integration/test-step)
[![GitHub Issues](https://img.shields.io/github/issues/Kronos-Integration/test-step.svg?style=flat-square)](https://github.com/Kronos-Integration/test-step/issues)
[![Stories in Ready](https://badge.waffle.io/Kronos-Integration/test-step.svg?label=ready&title=Ready)](http://waffle.io/Kronos-Integration/test-step)
[![Dependency Status](https://david-dm.org/Kronos-Integration/test-step.svg)](https://david-dm.org/Kronos-Integration/test-step)
[![devDependency Status](https://david-dm.org/Kronos-Integration/test-step/dev-status.svg)](https://david-dm.org/Kronos-Integration/test-step#info=devDependencies)
[![docs](http://inch-ci.org/github/Kronos-Integration/test-step.svg?branch=master)](http://inch-ci.org/github/Kronos-Integration/test-step)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![downloads](http://img.shields.io/npm/dm/test-step.svg?style=flat-square)](https://npmjs.org/package/test-step)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# @kronos-integration/test-step

kronos-step testing support

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Step](#step)
-   [StepFactory](#stepfactory)
-   [Owner](#owner)
-   [StaticAsserts](#staticasserts)
-   [LivecycleAsserts](#livecycleasserts)
-   [stepTestStatic](#stepteststatic)
-   [stepTestLivecycle](#steptestlivecycle)

## Step

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

## StepFactory

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Owner

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

## StaticAsserts

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `t` **ava** 
-   `instance` **[Step](#step)** 

## LivecycleAsserts

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `t` **ava** 
-   `instance` **[Step](#step)** 
-   `livecycle` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `livecycle.statesHistory` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

## stepTestStatic

Run static (initialization) tests

**Parameters**

-   `t` **ava** 
-   `Factory` **[StepFactory](#stepfactory)** 
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `owner` **[Owner](#owner)** 
-   `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `undefined`)
-   `additionalAsserts` **[StaticAsserts](#staticasserts)**  (optional, default `dummy`)

## stepTestLivecycle

Run livecycle tests

**Parameters**

-   `t` **ava** 
-   `step` **[Step](#step)** 
-   `owner` **[Owner](#owner)** 
-   `additionalAsserts` **[LivecycleAsserts](#livecycleasserts)**  (optional, default `dummy`)

# install

With [npm](http://npmjs.org) do:

```shell
npm install @kronos-integration/test-step
```

# license

BSD-2-Clause

test support for kronos steps

# install

With [npm](http://npmjs.org) do:

```sh
npm install kronos-test-step
```

# license

BSD-2-Clause
