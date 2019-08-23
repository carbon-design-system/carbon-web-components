'use strict';

// For generating coverage report for untested files
const srcContext = require.context('../src/components', true, /\.ts$/);
srcContext
  .keys()
  .filter(file => !/-story(-(angular|react|vue))?\.tsx?$/.test(file))
  .forEach(srcContext);

const specContext = require.context('.', true, /_spec\.ts$/);
specContext.keys().forEach(specContext);
