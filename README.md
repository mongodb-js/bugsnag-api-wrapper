# bugsnag-api-wrapper [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

> Light wrapper around bugsnag's API and abstract out api-specific functions

## Example

The wrapper exposes two basic functions `getErrors` and `getEvents`.

```javascript
getErrors(<querystring>, callback);
```
getErrors returns a list of all errors filtered by the querystring - narrow down errors returned by release_stages, app_versions, severity, status through the query string parameter.

```javascript
getEvents(<querystring>, callback);
```
getEvents returns a list of all events (individual crashes) filtered by the querystring - narrow down events returned by start_time, end_time through the query string parameter.

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/bugsnag-api-wrapper.svg
[travis_url]: https://travis-ci.org/mongodb-js/bugsnag-api-wrapper
[npm_img]: https://img.shields.io/npm/v/bugsnag-api-wrapper.svg
[npm_url]: https://npmjs.org/package/bugsnag-api-wrapper
