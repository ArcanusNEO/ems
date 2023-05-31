import crypto from 'crypto'
import publicKey from '../config/public-key.js'
import privateKey from '../config/private-key.js'

const encrypt = (plain) => {
  try {
    const buffer = Buffer.from(plain, 'utf8')
    return crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, buffer).toString('base64')
  } catch { }
  return null
}

const decrypt = (cipher) => {
  try {
    return crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(cipher, 'base64')).toString()
  } catch { }
  return null
}

console.log(decrypt(encrypt('Testing crypto lib...')))

export default { encrypt, decrypt }