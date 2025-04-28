"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"

const features = [
  {
    title: "Minimal & Fast",
    desc: "Designed to get your ideas out without distractions."
  },
  {
    title: "Offline Support",
    desc: "Works right in your browser. No account needed."
  },
  {
    title: "Export to PDF",
    desc: "Download clean, ready-to-send presentations."
  },
]


export default function HomePage() {
  const heroRef = useRef(null)
  const featureRef = useRef(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out"
    })

    gsap.from(featureRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    })
  }, [])
  

  return (
    <main
      className="min-h-screen bg-zinc-900 text-white font-sans px-6 md:px-20 py-16"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="text-center space-y-6"
      >
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          SlideForge
        </h1>
        <p
          className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto"
        >
          Create beautiful, client-ready presentations in minutes - no sign-up, no complexity.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 transition rounded-full px-6 py-3 text-white text-lg font-semibold shadow-lg"
        >
          Try It Now
        </Link>
      </section>

      {/* Features */}
      <section
        ref={featureRef}
        className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 shadow hover:shadow-xl transition"
          >
            <h3
              className="text-xl font-semibold mb-2"
            >
              {item.title}
            </h3>
            <p
              className="text-zinc-400"
            >
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="mt-32 text-center text-zinc-500 text-sm"
      >
        Built by Mehran Shahani - {year}
      </footer>
    </main>
  )
}