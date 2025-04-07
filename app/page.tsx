"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, X, Settings, Send, Lightbulb, Maximize, Share } from "lucide-react"

export default function App() {
  type BasicMessage = {
    id: number
    content: string | React.ReactNode
    role: string
    timestamp: string
  }

  const [messages, setMessages] = useState<BasicMessage[]>([])
  const [input, setInput] = useState("")
  const [model, setModel] = useState("Luminous")
  const [isLoading, setIsLoading] = useState(false)
  const [creativity, setCreativity] = useState(0.3)
  const [maxTokens, setMaxTokens] = useState(3072)
  const [webSearch, setWebSearch] = useState(false)
  const [memoryRetention, setMemoryRetention] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDraggingCreativity, setIsDraggingCreativity] = useState(false)
  const [isDraggingTokens, setIsDraggingTokens] = useState(false)

  const conversationHistory = [
    { id: 1, title: "Previous conversation 1" },
    { id: 2, title: "Previous conversation 2" },
    { id: 3, title: "Previous conversation 3" },
  ]

  // Facts, advice, and quotes for responses
  const facts = [
    "The shortest war in history was between Britain and Zanzibar in 1896, lasting only 38 minutes.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
    "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.",
    "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
    "Octopuses have three hearts, nine brains, and blue blood.",
  ]

  const advice = [
    "Don't wait for the perfect moment. Take a moment and make it perfect.",
    "The best way to predict your future is to create it.",
    "Small progress is still progress. Celebrate your small wins.",
    "Treat yourself with the same kindness you offer to others.",
    "It's okay to say no to things that drain your energy or happiness.",
  ]

  const quotes = [
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ]

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        id: Date.now(),
        content: (
          <div className="space-y-2">
            <p>Hello! I'm here to help. What would you like to know about?</p>
            <div className="flex flex-col space-y-2 mt-2">
              <button
                onClick={() => handleOptionClick("Tell me a fact")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Tell me a fact
                <ChevronRight size={18} className="text-amber-500" />
              </button>
              <button
                onClick={() => handleOptionClick("Give me advice")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Give me advice
                <ChevronRight size={18} className="text-amber-500" />
              </button>
              <button
                onClick={() => handleOptionClick("Share a quote")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Share a quote
                <ChevronRight size={18} className="text-amber-500" />
              </button>
            </div>
          </div>
        ),
        role: "assistant",
        timestamp: getCurrentTime(),
      }
      setMessages([greeting])
    }
  }, [])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const handleOptionClick = (option: string) => {
    // Add user selection as a message
    const userMessage = {
      id: Date.now(),
      content: option,
      role: "user",
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let responseContent = ""

      // Generate appropriate response based on option
      if (option === "Tell me a fact") {
        responseContent = getRandomItem(facts)
      } else if (option === "Give me advice") {
        responseContent = getRandomItem(advice)
      } else if (option === "Share a quote") {
        responseContent = getRandomItem(quotes)
      }

      const aiResponse = {
        id: Date.now() + 1,
        content: responseContent,
        role: "assistant",
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, aiResponse])

      // Add follow-up options after a short delay
      setTimeout(() => {
        const followUpOptions = {
          id: Date.now() + 2,
          content: (
            <div className="space-y-2">
              <p>Thanks for selecting an option! Please select another:</p>
              <div className="flex flex-col space-y-2 mt-2">
                <button
                  onClick={() => handleOptionClick("Tell me a fact")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Tell me a fact
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
                <button
                  onClick={() => handleOptionClick("Give me advice")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Give me advice
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
                <button
                  onClick={() => handleOptionClick("Share a quote")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Share a quote
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
              </div>
            </div>
          ),
          role: "assistant",
          timestamp: getCurrentTime(),
        }

        setMessages((prev) => [...prev, followUpOptions])
        setIsLoading(false)
      }, 500)
    }, 1000)
  }

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = {
        id: Date.now(),
        content: input,
        role: "user",
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          content: (
            <div className="space-y-2">
              <p>Thanks for your message! Please select one of these options:</p>
              <div className="flex flex-col space-y-2 mt-2">
                <button
                  onClick={() => handleOptionClick("Tell me a fact")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Tell me a fact
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
                <button
                  onClick={() => handleOptionClick("Give me advice")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Give me advice
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
                <button
                  onClick={() => handleOptionClick("Share a quote")}
                  className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
                >
                  Share a quote
                  <ChevronRight size={18} className="text-amber-500" />
                </button>
              </div>
            </div>
          ),
          role: "assistant",
          timestamp: getCurrentTime(),
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    // Add initial greeting
    setTimeout(() => {
      const greeting = {
        id: Date.now(),
        content: (
          <div className="space-y-2">
            <p>Hello! I'm here to help. What would you like to know about?</p>
            <div className="flex flex-col space-y-2 mt-2">
              <button
                onClick={() => handleOptionClick("Tell me a fact")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Tell me a fact
                <ChevronRight size={18} className="text-amber-500" />
              </button>
              <button
                onClick={() => handleOptionClick("Give me advice")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Give me advice
                <ChevronRight size={18} className="text-amber-500" />
              </button>
              <button
                onClick={() => handleOptionClick("Share a quote")}
                className="text-left p-3 bg-[#1e293b] rounded-md hover:bg-[#2a3a50] transition-colors flex justify-between items-center"
              >
                Share a quote
                <ChevronRight size={18} className="text-amber-500" />
              </button>
            </div>
          </div>
        ),
        role: "assistant",
        timestamp: getCurrentTime(),
      }
      setMessages([greeting])
    }, 100)
  }

  // Handle slider drag events
  const handleCreativityMouseDown = () => {
    setIsDraggingCreativity(true)
  }

  const handleTokensMouseDown = () => {
    setIsDraggingTokens(true)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingCreativity(false)
      setIsDraggingTokens(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingCreativity) {
        const sliderRect = document.getElementById("creativity-slider")?.getBoundingClientRect()
        if (sliderRect) {
          const newValue = Math.max(0, Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width))
          setCreativity(Number.parseFloat(newValue.toFixed(1)))
        }
      }

      if (isDraggingTokens) {
        const sliderRect = document.getElementById("tokens-slider")?.getBoundingClientRect()
        if (sliderRect) {
          const newValue = Math.max(
            0,
            Math.min(4096, Math.round(((e.clientX - sliderRect.left) / sliderRect.width) * 4096)),
          )
          setMaxTokens(newValue)
        }
      }
    }

    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDraggingCreativity, isDraggingTokens])

  return (
    <div className="flex h-screen w-screen bg-[#0f1525] text-white overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-[225px] bg-[#1e1e1e] text-white flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-[#2a2a2a]">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#f59e0b] rounded-md flex items-center justify-center mr-2">
                <Lightbulb size={16} />
              </div>
              <h2 className="text-lg font-medium">Luminary</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="p-4">
            <button
              className="w-full py-2 bg-[#f59e0b] rounded text-white cursor-pointer hover:bg-[#d97706] transition-colors"
              onClick={handleNewChat}
            >
              New Conversation
            </button>
          </div>

          <div className="p-4 border-t border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Settings size={16} className="mr-2" />
                <h3 className="text-sm font-medium">Configuration</h3>
              </div>
              <ChevronRight size={16} className="text-gray-400 rotate-90" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-[#f59e0b] mr-1">🔥</span> Creativity:
                  </span>
                  <span className="text-[#f59e0b]">{creativity.toFixed(1)}</span>
                </div>
                <div className="relative">
                  <div
                    id="creativity-slider"
                    className="px-1 relative h-6 flex items-center cursor-pointer"
                    onMouseDown={handleCreativityMouseDown}
                  >
                    <div className="w-full h-1 bg-[#3a3a3a] rounded-lg"></div>
                    <div
                      className="absolute top-[10px] left-0 h-1 bg-[#f59e0b] rounded-lg"
                      style={{ width: `${creativity * 100}%` }}
                    ></div>
                    <div
                      className="absolute top-[7px] w-3 h-3 bg-[#f59e0b] rounded-full cursor-grab active:cursor-grabbing"
                      style={{ left: `calc(${creativity * 100}% - 6px)` }}
                    ></div>
                  </div>
                  <div className="absolute left-0 right-0 bottom-0 flex justify-between px-1">
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-[#f59e0b] mr-1">📊</span> Max Tokens:
                  </span>
                  <span className="text-[#f59e0b]">{maxTokens}</span>
                </div>
                <div className="relative">
                  <div
                    id="tokens-slider"
                    className="px-1 relative h-6 flex items-center cursor-pointer"
                    onMouseDown={handleTokensMouseDown}
                  >
                    <div className="w-full h-1 bg-[#3a3a3a] rounded-lg"></div>
                    <div
                      className="absolute top-[10px] left-0 h-1 bg-[#f59e0b] rounded-lg"
                      style={{ width: `${(maxTokens / 4096) * 100}%` }}
                    ></div>
                    <div
                      className="absolute top-[7px] w-3 h-3 bg-[#f59e0b] rounded-full cursor-grab active:cursor-grabbing"
                      style={{ left: `calc(${(maxTokens / 4096) * 100}% - 6px)` }}
                    ></div>
                  </div>
                  <div className="absolute left-0 right-0 bottom-0 flex justify-between px-1">
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#3a3a3a] rounded-full"></span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Web Search</span>
                  <div
                    className={`w-10 h-5 rounded-full p-1 cursor-pointer ${webSearch ? "bg-[#f59e0b]" : "bg-[#3a3a3a]"}`}
                    onClick={() => setWebSearch(!webSearch)}
                  >
                    <div
                      className={`bg-white h-3 w-3 rounded-full shadow-md transform transition-transform ${webSearch ? "translate-x-5" : ""}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory Retention</span>
                  <div
                    className={`w-10 h-5 rounded-full p-1 cursor-pointer ${memoryRetention ? "bg-[#f59e0b]" : "bg-[#3a3a3a]"}`}
                    onClick={() => setMemoryRetention(!memoryRetention)}
                  >
                    <div
                      className={`bg-white h-3 w-3 rounded-full shadow-md transform transition-transform ${memoryRetention ? "translate-x-5" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#2a2a2a] flex-1 overflow-auto">
            <h3 className="text-sm font-medium mb-2">Conversation History</h3>
            <div className="space-y-1">
              {conversationHistory.map((convo) => (
                <button
                  key={convo.id}
                  className="w-full text-left p-2 text-sm text-gray-300 hover:bg-[#2a2a2a] rounded transition-colors"
                >
                  {convo.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0f1525] relative">
        <div className="p-3 border-b border-[#1e293b] flex justify-between items-center">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="mr-2 text-gray-400 hover:text-white">
              <Settings size={18} />
            </button>
          )}
          <div className="flex items-center">
            <span className="text-[#f59e0b] font-medium mr-2">{model}</span>
            <span className="flex items-center text-green-500 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Ready
            </span>
          </div>
          <div className="flex items-center">
            <button className="text-gray-400 hover:text-white mr-2">
              <Share size={18} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Maximize size={18} />
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-auto p-4 flex flex-col space-y-6"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {messages.length === 0 ? (
            <div className="text-gray-500 text-center mt-5 flex-1 flex items-center justify-center">
              <div>
                <h3 className="text-xl font-medium mb-2">Welcome to Luminary</h3>
                <p>Start a conversation to begin.</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.role === "user"
                      ? "ml-auto bg-[#d97706] max-w-[200px]"
                      : "mr-auto bg-[#1e293b] max-w-[450px]"
                  } p-3 rounded-lg text-white relative`}
                >
                  {typeof message.content === "string" ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    message.content
                  )}
                  <div className="text-xs text-gray-400 mt-1 flex items-center justify-end">
                    <span className="inline-block">
                      <span className="w-1 h-1 bg-amber-500 rounded-full inline-block mr-1"></span>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto bg-[#1e293b] p-3 rounded-lg max-w-[450px] text-white">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="p-4 border-t border-[#1e293b] bg-[#1a1a1a]">
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              className="w-full p-3 pr-12 rounded-full border border-[#2a2a2a] bg-[#2a2a2a] text-white focus:outline-none"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                isLoading || !input.trim()
                  ? "bg-[#3a3a3a] text-gray-500 cursor-not-allowed"
                  : "bg-[#f59e0b] text-white hover:bg-[#d97706] transition-colors"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

