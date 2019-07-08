'use strict';

/**
 * A WebPack loader to load multiple instances of a given module with differnet options and concatenate them.
 */
module.exports = function MultipleInstancesLoader(content) {
  const { instances } = this.query;
  if (!Array.isArray(instances)) {
    throw new TypeError('Missing `instances` option.');
  }
  const callback = this.async();
  Promise.all(
    instances.map(({ loader, options }, i) => {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const loaderModule = typeof loader === 'string' ? require(loader) : loader;
      if (typeof loaderModule !== 'function') {
        throw new TypeError('Missing loader at instance#:', i);
      }
      return new Promise((resolve, reject) => {
        loaderModule.call(
          {
            ...this,
            async() {
              return (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              };
            },
            query: options,
          },
          content
        );
      });
    })
  ).then(results => {
    callback(null, results.join('\n'));
  }, callback);
};
