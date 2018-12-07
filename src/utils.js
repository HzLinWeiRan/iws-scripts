import fs from 'fs'
import UglifyJS from 'uglify-es'
import Handlebars from 'handlebars'

export const loadMinified = (filePath) => {
        const code = fs.readFileSync(filePath, 'utf-8')
        const result = UglifyJS.minify(code)
        if (result.error) return ''
        return result.code
    }

export const handleTemp  = (source, data) => {
    const template = Handlebars.source(source)
    return template(data)
}
