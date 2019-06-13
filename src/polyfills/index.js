// NOTE: `Array.from()` and `Object.assign()` and event constructor are covered by `@webcomponents/webcomponents-platform`
import 'core-js/modules/es.array.find.js';
import 'core-js/modules/es.math.sign.js';
import 'core-js/modules/es.symbol.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.object.values.js';

import './element-closest.js';
import './element-matches.js';
import './toggle-class.js';

import 'es6-promise/auto'; // eslint-disable-line import/first

import '@webcomponents/webcomponents-platform';
import '@webcomponents/template/template.js';
import '@webcomponents/shadydom/src/shadydom.js';
import '@webcomponents/custom-elements/src/custom-elements.js';
import '@webcomponents/shadycss/entrypoints/scoping-shim.js';
import '@webcomponents/url/url.js';
