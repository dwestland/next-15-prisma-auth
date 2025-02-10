'use client'
import { useState, useTransition } from 'react'
import { sendChatMessage } from './actions'

export default function ChatClient() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    // Pass the current conversation history as a hidden field.
    formData.set('history', JSON.stringify(messages))
    startTransition(async () => {
      try {
        const result = await sendChatMessage(formData)
        const updatedHistory = JSON.parse(result)
        setMessages(updatedHistory)
        form.reset()
      } catch (error) {
        console.error('Chat message submission failed:', error)
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded space-y-2">
        {messages.length === 0 && (
          <p>No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === 'user'
                ? 'bg-green-100 text-[#0a0a0a]'
                : 'bg-gray-200 text-[#0a0a0a]'
            }`}
          >
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          name="message"
          placeholder="Type your message here..."
          required
          className="p-2 border rounded text-[#0a0a0a]"
          rows={4}
        />
        <input type="hidden" name="history" value={JSON.stringify(messages)} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
