import dotenv from 'dotenv'
dotenv.config()

export default {
  transportInfo: {
    host: "mail.transcliff.top",
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
      user: "noreply@transcliff.top",
      pass: process.env.EMAIL_PASSWORD
    }
  },
  mailInfo: {
    from: "\"Administrator\" <noreply@transcliff.top>",
    subject: ""
  }
}
