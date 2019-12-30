[![Build Status](https://secure.travis-ci.org/Kronos-Integration/test-step.png)](http://travis-ci.org/Kronos-Integration/test-step)
[![codecov.io](http://codecov.io/github/Kronos-Integration/test-step/coverage.svg?branch=master)](http://codecov.io/github/Kronos-Integration/test-step?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![downloads](http://img.shields.io/npm/dm/@kronos-integration/test-step.svg?style=flat-square)](https://npmjs.org/package/@kronos-integration/test-step)
[![GitHub Issues](https://img.shields.io/github/issues/Kronos-Integration/test-step.svg?style=flat-square)](https://github.com/Kronos-Integration/test-step/issues)
[![Greenkeeper](https://badges.greenkeeper.io/Kronos-Integration/test-step.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/Kronos-Integration/test-step/badge.svg)](https://snyk.io/test/github/Kronos-Integration/test-step)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/@kronos-integration/test-step)](https://bundlephobia.com/result?p=@kronos-integration/test-step)
[![npm](https://img.shields.io/npm/v/@kronos-integration/test-step.svg)](https://www.npmjs.com/package/@kronos-integration/test-step)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/Kronos-Integration/test-step)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# @kronos-integration/test-step

kronos-step testing support with ava

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
