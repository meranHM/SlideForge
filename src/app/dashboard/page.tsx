"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"

type Presentation = {
    id: string
    title: string
    createdAt: number
}


export default function DashboardPage() {
    const [presentations, setPeresentations] = useState<Presentation[]>([])

    // Loading Presentations from localstorage
    useEffect(() => {
        const stored = localStorage.getItem("slideforge_presentation")

        if (stored) {
            setPeresentations(JSON.parse(stored))
        }
    }, [])

    // Creating a new presentation
    const handleNewPresentation = () => {
        const newPresentation: Presentation = {
            id: uuidv4(),
            title: "Untitled",
            createdAt: Date.now(),
        }

        const updated = [newPresentation, ...presentations]
        setPeresentations(updated)
        localStorage.setItem("slideforge_presentation", JSON.stringify(updated))

        // Redirecting to the editor
        window.location.href = `/editor/${newPresentation.id}`
    }

    return (
        <main
            className="min-h-screen bg-zinc-900 text-white font-sans px-6 md:px-20 py-16"
        >
            {/* Header */}
            <div
                className="flex justify-between items-center mb-12"
            >
                <h1
                    className="text-3xl md:text-4xl font-bold"
                >
                    Your Presentation
                </h1>
                <button
                    onClick={handleNewPresentation}
                    className="bg-purple-600 hover:bg-purple-700 transition rounded-full px-6 py-3 text-white text-lg font-semibold shadow-lg"
                >
                    + New Presentation
                </button>
            </div>

            {/* Presentations List */}
            {presentations.length === 0 ? (
                <p
                    className="text-zinc-400"
                >
                    No presentations yet. Click "New Presentation" to create one!
                </p>
            ) : (
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cold-3 gap-6"
                >
                    {presentations.map((presentation) => (
                        <Link
                            key={presentation.id}
                            href={`/editor/${presentation.id}`}
                            className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:shadow-lg transition block"
                        >
                            <h3
                                className="text-xl font-semibold mb-2"
                            >
                                {presentation.title}
                            </h3>
                            <p
                                className="text-zinc-400 text-sm"
                            >
                                {new Date(presentation.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}

