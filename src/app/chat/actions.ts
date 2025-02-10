'use server'
export async function sendChatMessage(formData: FormData) {
  const message = formData.get('message')
  if (typeof message !== 'string' || !message)
    throw new Error('Message is required.')

  // Retrieve current conversation history; default to an empty array.
  const historyStr = formData.get('history')
  let history: { role: string; content: string }[] = []
  if (typeof historyStr === 'string' && historyStr) {
    try {
      history = JSON.parse(historyStr)
    } catch {
      // ignore parse errors; use empty history
    }
  }

  // Append the new user message.
  history.push({ role: 'user', content: message })

  // Call the OpenAI Chat Completion API.
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: history,
    }),
  })
  const data = await response.json()
  const reply = data.choices?.[0]?.message
  if (reply) {
    history.push(reply)
  }
  // Return the updated conversation as a JSON string.
  return JSON.stringify(history)
}
