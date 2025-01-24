export const mailchimpSubscribe = async (email: string) => {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const server = process.env.MAILCHIMP_API_SERVER
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`)
  }

  return await response
}
