'use strict';

if (process.env.FlowError) {
  console.log(process.env.FlowError);
  process.exit();
}
var response = JSON.parse(process.env.FlowResponse || '{}');
var passed = response.passed;
var errors = response.errors;
var version = response.version;

if (passed && errors.length === 0) {
  console.log("No Flow errors!", new Date());
  process.exit();
}

var doesThisFileHaveIssues;

process.stdout.write('\n  \n  <style>\n    .warning {\n      opacity: 0.5;\n    }\n    code {\n      font-family: mplus-2m-regular, menlo, fixed-width;\n      font-weight: normal;\n    }\n  </style>\n  \n  <table cellspacing=0>\n');

function getName(path, line) {
  if (path === process.env.TM_FILEPATH) {
    return ':' + line;
  }
  return path.split('/').reverse()[0].split('.')[0];
}

errors.forEach(function (_ref, errorIndex) {
  var message = _ref.message;

  message.forEach(function (_ref2, index) {
    var descr = _ref2.descr;
    var level = _ref2.level;
    var path = _ref2.path;
    var line = _ref2.line;
    var endline = _ref2.endline;
    var start = _ref2.start;
    var end = _ref2.end;

    if (path === process.env.TM_FILEPATH) {
      doesThisFileHaveIssues = true;
    }
    var name = getName(path, line);
    var href = 'txmt://open?url=file://' + encodeURIComponent(path) + '&line=' + encodeURIComponent(line) + '&column=' + encodeURIComponent(start);
    var body = descr.split('\n').map(function (line, descrIndex) {
      return '\n      <span style="' + (index === 0 && 'font-weight:bold;') + '">' + line.replace(/`([^`]*)`/g, '<code>$1</code>') + '</span>\n    ';
    }).join('<br>');
    var link = path && '\n      <a style="display:block;background-color:#eee;padding:1ex;border-radius:2ex;text-align:right;margin:0 1ex; text-decoration:none" href="' + href + '">' + name + '</a>\n    ' || '';
    process.stdout.write('\n      <tr class="' + level + '">\n        <th>' + (index === 0 && errorIndex + 1 || '') + '\n        <td style="padding-left: ' + index * 2 + 'ex;">\n          ' + link + '\n        <td>\n          <div style="margin-left: ' + index * 2 + 'em">\n            ' + body + '\n          </div>\n    ');
    // console.log({descr, level, path, line, endline, start, end})
  });
});

process.stdout.write('</table>');

process.stdout.write('\n  <h1>' + process.env.TM_FILENAME + ' ' + (doesThisFileHaveIssues ? 'has errors' : 'has no errors') + '</h1>\n');

process.stdout.write('\n  <small>' + new Date() + '</small>\n');

// process.stdout.write(`
//   <pre>${JSON.stringify(response, null, 2)}</pre>
// `);