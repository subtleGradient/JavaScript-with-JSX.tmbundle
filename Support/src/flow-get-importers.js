var importers = JSON.parse(process.env.FlowResponse || '{}');
var paths = importers[Object.keys(importers)[0]];
if (!paths) {
  process.exit();
}

var pathToName = path => path.split('/').reverse()[0].split('.')[0];

var menuItemsPlist = paths.map(pathToName).map(name => `{ title = ${name}; }`);

console.log(
  `(
    {header = 1; title = 'Modules that import "${process.env.FILENAME}"';},
    ${menuItemsPlist.join(',')}
  )`
)

console.warn(
  paths.join('\n')
)
