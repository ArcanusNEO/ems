import nodemailer from 'nodemailer'
import info from '../config/email.js'

const transporter = nodemailer.createTransport(info.transportInfo)

const sendEmail = async (address, content = "Null", subject = "Null") => {
  try {
    info.mailInfo.to = address
    info.mailInfo.text = content
    info.mailInfo.subject = subject
    await transporter.sendMail(info.mailInfo)
    // console.log("邮件成功发送: %s", ret.messageId)
    return true
  } catch { }
  return false
}

export default sendEmail