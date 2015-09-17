'use strict';

var importers = JSON.parse(process.env.FlowResponse || '{}');
var paths = importers[Object.keys(importers)[0]];
if (!paths) {
  process.exit();
}

var pathToName = function pathToName(path) {
  return path.split('/').reverse()[0].split('.')[0];
};

var menuItemsPlist = paths.map(pathToName).map(function (name) {
  return '{ title = ' + name + '; }';
});

console.log('(\n    {header = 1; title = \'Modules that import "' + process.env.FILENAME + '"\';},\n    ' + menuItemsPlist.join(',') + '\n  )');

console.warn(paths.join('\n'));