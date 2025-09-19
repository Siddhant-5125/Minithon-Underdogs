import { useState } from "react"
import "./door.css"
import houseImage from "/src/images/dormitory1.jpg"

function DormitoryLanding({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpening, setIsOpening] = useState(false)
  const [isZooming, setIsZooming] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsOpening(true)
    setTimeout(() => {
      setIsZooming(true)
      setTimeout(() => {
        onLogin()
      }, 1000) // 1 second for zoom animation
    }, 1500) // Wait for door animation to finish
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${houseImage})`,
          transformOrigin: 'center center',
          transform: isZooming ? 'scale(11.0)' : 'scale(1.0)'
        }}
      ></div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Login Door */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-500 ${
        isZooming ? 'opacity-0' : 'opacity-100'
      }`}>
        <div
          className={`door-container ${isOpening ? "open" : ""}`}
          style={{
            position: "absolute",
            bottom: "22%", // adjust this to place door correctly
            left: "48%", // center horizontally
            transform: "translateX(-50%)",
          }}
        >
          <div className="door w-[260px] h-[530px] bottom-60 bg-gradient-to-b from-white via-gray-200 to-gray-300 border-4 border-black shadow-lg relative rounded-md flex items-center justify-center">
            {/* Door Handle */}
            <div className="absolute right-1 top-1/2 w-4 h-4 bg-black rounded-full shadow-md"></div>

            {/* Login Form */}
            {!isOpening && (
              <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-3 w-full">
                <h2 className="text-center text-black font-bold text-lg">Grand Login</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-sm rounded border border-gray-500 focus:ring-2 focus:ring-sky-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 text-sm rounded border border-gray-500 focus:ring-2 focus:ring-sky-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded transition"
                >
                  Knock Knock
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DormitoryLanding