import fs from 'fs'
const p = 'c:/Users/vansh/OneDrive/Documents/ALL WEBSITES/final nexus/errors.txt'
const t = fs.readFileSync(p, 'utf-16le')
console.log(t)
