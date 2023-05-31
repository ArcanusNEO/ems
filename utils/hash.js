import crypto from 'crypto'

const md5 = (string) => {
  return crypto.createHash('md5').update(string).digest('hex')
}

const sha256 = (string) => {
  return crypto.createHash('sha256').update(string).digest('hex')
}

const sha512 = (string) => {
  return crypto.createHash('sha512').update(string).digest('hex')
}

const hashf = sha256

export default { hashf, md5, sha256, sha512 }
