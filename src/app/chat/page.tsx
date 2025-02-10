import ChatClient from './ChatClient'

export default function ChatPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <p className="mb-4">
        This chat client uses server actions and maintains session memory.
      </p>
      <ChatClient />
    </div>
  )
}
