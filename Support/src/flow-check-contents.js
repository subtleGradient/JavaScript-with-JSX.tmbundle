if (process.env.FlowError) {
  console.log(process.env.FlowError)
  process.exit()
}
var response = JSON.parse(process.env.FlowResponse || '{}');
var {passed, errors, version} = response;
if (passed && errors.length === 0) {
  console.log("No Flow errors!", new Date)
  process.exit()
}

var doesThisFileHaveIssues

process.stdout.write(`
  
  <style>
    .warning {
      opacity: 0.5;
    }
    code {
      font-family: mplus-2m-regular, menlo, fixed-width;
      font-weight: normal;
    }
  </style>
  
  <table cellspacing=0>
`);

function getName(path, line){
  if (path === process.env.TM_FILEPATH) {
    return ':' + line;
  }
  return path.split('/').reverse()[0].split('.')[0]
}

errors.forEach(({message}, errorIndex) => {
  message.forEach(function({descr, level, path, line, endline, start, end}, index){
    if (path === process.env.TM_FILEPATH) {
      doesThisFileHaveIssues = true;
    }
    var name = getName(path, line);
    var href = `txmt://open?url=file://${encodeURIComponent(path)}&line=${encodeURIComponent(line)}&column=${encodeURIComponent(start)}`
    var body = descr.split('\n').map((line, descrIndex) => `
      <span style="${index === 0 && 'font-weight:bold;'}">${line.replace(/`([^`]*)`/g, '<code>$1</code>')}</span>
    `).join('<br>')
    var link = path && `
      <a style="display:block;background-color:#eee;padding:1ex;border-radius:2ex;text-align:right;margin:0 1ex; text-decoration:none" href="${href}">${name}</a>
    ` || ''
    process.stdout.write(`
      <tr class="${level}">
        <th>${index === 0 && errorIndex + 1 || ''}
        <td style="padding-left: ${index * 2}ex;">
          ${link}
        <td>
          <div style="margin-left: ${index * 2}em">
            ${body}
          </div>
    `);
    // console.log({descr, level, path, line, endline, start, end})
  })
})

process.stdout.write(`</table>`);

process.stdout.write(`
  <h1>${process.env.TM_FILENAME} ${doesThisFileHaveIssues ? 'has errors' : 'has no errors'}</h1>
`);

process.stdout.write(`
  <small>${new Date}</small>
`);

// process.stdout.write(`
//   <pre>${JSON.stringify(response, null, 2)}</pre>
// `);
