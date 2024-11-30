# @onepay-payment-sdk/server

## 0.0.3

### Patch Changes

- 914ffda: Patch ReDoS vulnerability & Bug Fixes

  ## 🔒 Security Updates

  - Fixed ReDoS (Regular Expression Denial of Service) vulnerability by upgrading cross-spawn to version 7.0.5
  - Implemented security patch across multiple dependencies:
    - @changesets/cli
    - @commitlint/cli
    - eslint
    - pretty-quick

  ## 📦 Dependency Updates

  - Enforced cross-spawn@7.0.5 across all dependencies through pnpm overrides
  - Updated associated package dependencies to maintain compatibility

  ## 🔍 Technical Details

  - Security fix addresses potential denial of service attacks through improper input sanitization
  - ESM improvements ensure better interoperability with both CommonJS and ES Module systems

- 565ccb2: Fix esm import issue

  ## 🛠️ Bug Fixes

  - Fixed ESM Import Issue: Resolved issues with importing ES modules, ensuring compatibility with modern JavaScript imports
  - Improved compatibility with ES module syntax
  - Enhanced support for modern JavaScript import/export statements
  - Better integration with package.json "type": "module" configurations

## 0.0.3-beta.0

### Patch Changes

- Fix esm import issue

  - Bug Fixes
    Fixed ESM Import Issue: Resolved issues with importing ES modules, ensuring compatibility with modern JavaScript imports.

## 0.0.2

### Patch Changes

- a4a5771: Updated README.md with improved clarity

  - Updated README.md to improve clarity and provide more detailed examples for usage.

## 0.0.1

### Patch Changes

- 3e37ec5: Initial experimental release of the OnePay SDK

  - **Features**:
    - Serialize and validate payment parameters to ensure secure and consistent requests.
    - Generate payment request link easily with minimal setup.

  ⚠️ This is an **experimental release** intended for testing and feedback purposes. The API and features are subject to change in future updates. Use with caution in non-production environments.
