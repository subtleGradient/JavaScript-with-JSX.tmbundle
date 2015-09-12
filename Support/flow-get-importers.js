var importers = JSON.parse(process.env.FlowResponse || '{}');
var paths = importers[Object.keys(importers)[0]];
if (!paths) {
  process.exit();
}

console.log(
  '('
  + "{header = 1; title = 'Modules that import this one';},"
  + paths.map(function(path){
    var title = path.split('/').reverse()[0].split('.')[0];
    return '{title = ' + title + ';}'
  })
  .join(',')
  + ')'
)

console.warn(
  paths.join('\n')
)
