import fs from 'fs'
const p = 'c:/Users/vansh/OneDrive/Documents/ALL WEBSITES/final nexus/errors.txt'
const t = fs.readFileSync(p, 'utf-16le')
fs.writeFileSync('c:/Users/vansh/OneDrive/Documents/ALL WEBSITES/final nexus/errors_utf8.txt', t, 'utf-8')
