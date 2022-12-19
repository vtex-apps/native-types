# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Indonesian, Thai, Italian, Bulgarian, Catalan, Czech, Danish, German, Greek, Finnish, French, Japanese, Korean, Dutch, Norwegian, Polish, Portuguese, Romanian, Russian, Slovak, Swedish, Slovenian and Ukrainian translations.

### Fixed
- Arabic, English, Spanish and Portuguese translations.

## [0.8.0] - 2022-03-08

### Added
- Arabic, Norwegian and Norwegian variant translation.

## [0.7.5] - 2020-12-18
### Fixed
- Missing `ReactElement` possible value type for messages.

## [0.7.4] - 2020-12-01
### Fixed
- Exported types would resolve to `any` when any other apps tried to use them.

## [0.7.3] - 2020-11-13
### Fixed
- Marker interpolation bug introduced on `0.7.2`.

## [0.7.2] - 2020-11-12
### Changed
- Update linter and fix linting errors.

## [0.7.1] - 2020-04-06
### Fixed
- Added missing `key` to the spans rendered by `IOMessageWithMarkers`.

## [0.7.0] - 2020-03-03
### Added
- `IOMessageWithMarkers`.

## [0.6.0] - 2020-02-20
### Added
- Support for formatting new messages that are not defined in `IntlContext`.

## [0.5.4] - 2019-10-28
### Chore
- Rebuild to enable lazy evaluation of native-types entrypoints.

## [0.5.3] - 2019-10-14

### Removed

- GraphQL types.

## [0.5.2] - 2019-10-04

### Security

- Upgrade packages due to a security vulnerability in eslint-utils.

## [0.5.1] - 2019-09-11

### Security

- Upgrade packages due to a security vulnerability in eslint-utils.

## [0.5.0] - 2019-08-29

## [0.4.4] - 2019-08-08

### Security

- Upgrade packages due to a security vulnerability in Lodash.

## [0.4.3] - 2019-07-02

### Changed

- Remove unnecessary allOf refs from `contentSchemas`

## [0.4.2] - 2019-07-01

### Changed

- Internal intlMessage type verification on IOMessage.

## [0.4.1] - 2019-06-27

### Fixed

- Build assets with new builder hub.

## [0.4.0] - 2019-06-19

### Added

- Add support for child-as-function pattern on IOMessage.

## [0.3.0] - 2019-06-06

### Added

- Format to `richText`.
- Type to `richText`.

## [0.2.2] - 2019-06-05

### Fixed

- Use `https` on placeholder urls.

## [0.2.1] - 2019-06-04

### Added

- Tests.
- Changelog.
