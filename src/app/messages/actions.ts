'use server'

import { Resend } from 'resend'

export async function sendMessage(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    throw new Error('Missing or invalid form data')
  }

  const resend = new Resend(process.env.AUTH_RESEND_KEY)

  try {
    await resend.emails.send({
      from: process.env.AUTH_RESEND_FROM!,
      to: process.env.AUTH_RESEND_FROM!,
      subject: `Resume Bueno Message from ${name} (via website)`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    })
  } catch (error) {
    console.error('Failed to send message:', error)
    throw error
  }
}
