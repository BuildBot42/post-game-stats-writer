const { existsSync, readFile, writeFile } = require('fs');

function readAndWrite(data, config) {
  if(existsSync(config.templateFile)) {
    readFile(config.templateFile, 'utf8', (err, form) => {
      if(err) console.error(err)
      Object.keys(data).forEach(k => {
        if(typeof data[k] === 'object') {
          Object.keys(data[k]).forEach(k2 => {
            if(typeof data[k][k2] === 'object') {
              Object.keys(data[k][k2]).forEach(k3 => {
                form = form.replaceAll('{'+ [k, k2, k3].join('.') + '}', data[k][k2][k3].toString())
              })
            }
            else form = form.replaceAll('{'+ [k, k2].join('.') + '}', data[k][k2].toString())
          })
        }
        else form = form.replaceAll('{'+ k + '}', data[k].toString())
      })
      writeFile(config.outFile, form, (err) => {
        if(err) {
          console.error('There was an error writing to the file.');
          process.exit();
        }
        else console.log('Successfully wrote to ' + config.outFile)
      })
    })
  }
  else {
    console.error('Could not find `' + config.templateFile + '`! Is your path correct?')
    process.exit()
  }
}

module.exports = readAndWrite;
