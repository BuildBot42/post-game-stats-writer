const { existsSync, watch } = require('fs');
const parseData = require('./util.js')
const output = require('./out-file.js')
const config = {}

// CHECK CONFIG IF EXISTS
if(existsSync(process.cwd() + '/stats-config.json')) {
  try {
    let uc = require(process.cwd() + '/stats-config.json')
    Object.keys(uc).forEach(i => {
      config[i] = uc[i];
    })
    console.log('Successfully loaded configuration file.')
  } catch(err) {
    console.error('ERROR when checking stats-config - is it valid JSON?')
    process.exit()
  }
} else {
  console.log('No config found! Please provide a valid JSON config named "stats-config.json" present in the same folder as this executable.')
  process.exit()
}

watch(config.statsDumpDir, (type, filename) => {
  if(type === 'rename') {
    if(/\[?\d+\.\d+\]?[\w]+\.json/.test(filename) && existsSync(config.statsDumpDir + filename)) {
      console.log('Discovered new JSON dump: ' + filename)
      let data = parseData(require(config.statsDumpDir + filename))
      output(data, config); delete require.cache[require.resolve(config.statsDumpDir + filename)]
    }
  }
})
