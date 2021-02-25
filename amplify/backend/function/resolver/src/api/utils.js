const AWS = require('aws-sdk')
const https = require('https')
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
})
AWS.config.update({
  region: process.env.REGION,
  httpOptions: {
    agent,
  },
})
const ses = new AWS.SES({ region: 'us-west-2' })
const SourceEmailAddress = 'giorgoshstam@gmail.com' //TODO - CHANGE ON PRODUCTION!!

module.exports = {
  /**
   * Send an email via the SES.
   *
   * @param {String} subject
   * @param {String} body
   * @param {String} address
   */
  sendEmail: async (subject, body, address) => {
    return ses
      .sendEmail({
        Destination: {
          ToAddresses: [address],
        },
        Message: {
          Body: {
            Text: { Data: body },
          },
          Subject: { Data: subject },
        },
        Source: SourceEmailAddress,
      })
      .promise()
  },
  /**
   * Check if the input string is a valid e-mail address.
   *
   * @param {String} email
   */
  validateEmail: email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },

  itemContainsInvalidKeys: item => {
    if ('createdAt' in item || 'updatedAt' in item || '__typename' in item) {
      return true
    }
    return false
  },
}
