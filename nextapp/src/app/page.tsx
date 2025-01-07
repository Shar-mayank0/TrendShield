
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="text-center space-y-8">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-inter tracking-tight">
        Welcome to TrendShield
      </h1>
      
      <a href="https://forms.gle/YAXy8XNRG4mrYqmT8" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block">
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
        <span className="text-xl font-semibold">Join Our Waitlist! 🚀</span>
        </div>
      </a>
      <h2 className="text-2xl text-gray-300 font-light mt-8">
        Coming Soon!
      </h2>
      </div>
    </main>
  );
}
