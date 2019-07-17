import path from 'path'

const cwdPath = process.cwd()
const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
const envData = iwsConfig[global.env]
const defaultData = iwsConfig['default'] || {}

export default {
    ...defaultData,
    ...envData
}