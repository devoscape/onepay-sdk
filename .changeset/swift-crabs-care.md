---
"@onepay-payment-sdk/server": patch
---

Patch ReDoS vulnerability & Bug Fixes

## 🔒 Security Updates
- Fixed ReDoS (Regular Expression Denial of Service) vulnerability by upgrading cross-spawn to version 7.0.5
- Implemented security patch across multiple dependencies:
  - @changesets/cli
  - @commitlint/cli
  - eslint
  - pretty-quick

## 🛠️ Bug Fixes
- Fixed ESM Import Issue: Resolved issues with importing ES modules, ensuring compatibility with modern JavaScript imports
  - Improved compatibility with ES module syntax
  - Enhanced support for modern JavaScript import/export statements
  - Better integration with package.json "type": "module" configurations

## 📦 Dependency Updates
- Enforced cross-spawn@7.0.5 across all dependencies through pnpm overrides
- Updated associated package dependencies to maintain compatibility

## 🔍 Technical Details
- Security fix addresses potential denial of service attacks through improper input sanitization
- ESM improvements ensure better interoperability with both CommonJS and ES Module systems
