"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Reorder } from "framer-motion"

type Presentation = {
    id: string
    title: string
    createdAt: string
    slides: Slide[]
}

type Slide = {
    id: string
    content: string
}

export default function EditorPage() {
    const [presentation, setPresentation] = useState<Presentation | null>(null)
    const [newSildeContent, setNewSlideContent] = useState<string>("")
    
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    // Loading presentation by id from localstorage
    useEffect(() => {
        const stored = localStorage.getItem("slideforge_presentation")
        if (stored) {
            const parsed: Presentation[] = JSON.parse(stored)
            const found = parsed.find((p) => p.id === id)
            if (found) {
                setPresentation(found)
            } else {
                router.push("/dashboard")
            }
        }
    }, [id, router])

    // Saving to localstorage
    const savePresentation = (updated: Presentation) => {
        const stored = localStorage.getItem("slideforge_presentation")
        if (stored) {
            const parsed: Presentation[] = JSON.parse(stored)
            const updatedList = parsed.map((p) => (
                p.id === updated.id ? updated : p
            ))
            localStorage.setItem("slideforge_presentation", JSON.stringify(updatedList))
        }
    }

    // Updating title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!presentation) return

        const updated = { ...presentation, title: e.target.value }
        setPresentation(updated)
        savePresentation(updated)
    }

    // Adding a new slide
    const handleAddSlide = () => {
        if (!presentation || !newSildeContent.trim()) return

        const newSlide: Slide = {
            id: crypto.randomUUID(),
            content: newSildeContent,
        }

        const updated = {
            ...presentation,
            slides: [...(presentation.slides || []), newSlide]
        }

        setPresentation(updated)
        savePresentation(updated)
        setNewSlideContent("")
    }

    // Updating slide content
    const handleSlideContentChange = (slideId: string, newContent: string) => {
        if (!presentation) return

        const updatedSlides = presentation.slides.map((slide) => (
            slide.id === slideId ? { ...slide, content: newContent} : slide
        ))

        const updated = { ...presentation, slides: updatedSlides }
        setPresentation(updated)
        savePresentation(updated)
    }

    // Deleting a slide
    const handleDeleteSlide = (slideId: string) => {
        if (!presentation) return

        const updatedSlides = presentation.slides.filter((slide) => (
            slide.id !== slideId
        ))

        const updated = { ...presentation, slides: updatedSlides }
        setPresentation(updated)
        savePresentation(updated)
    }

    // Reordering slides
    const handleReorderSlides = (newOrder: Slide[]) => {
        if (!presentation) return

        const updated = { ...presentation, slides: newOrder }
        setPresentation(updated)
        savePresentation(updated)
    }

    return (
        <main
            className="min-h-screen bg-zinc-900 text-white font-sans px-6 md:px-20 py-16"
        >
            {!presentation ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Header */}
                    <div
                        className="flex justify-between items-center mb-12"
                    >
                        <input 
                            type="text" 
                            value={presentation.title}
                            onChange={handleTitleChange}
                            className="bg-transparent text-3xl md:text-4xl font-bold border-b border-zinc-700 focus:outline-none focus:border-purple-600 transition w-full"                        
                        />
                    </div>

                    {/* Slides */}
                    <Reorder.Group
                        axis="y"
                        values={presentation.slides}
                        onReorder={handleReorderSlides}
                        className="space-y-6"
                    >
                            {presentation.slides.map((slide) => (
                                <Reorder.Item
                                    key={slide.id}
                                    value={slide}
                                    className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:shadow-lg transition space-y-4 cursor-grab active:cursor-grabbing"
                                >
                                    <textarea 
                                        value={slide.content}
                                        onChange={(e) => handleSlideContentChange(slide.id, e.target.value)}
                                        className="w-full bg-transparent text-lg focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleDeleteSlide(slide.id)}
                                        className="text-sm text-red-400 hover:text-red-500 transition"
                                    >
                                        Delete Slide
                                    </button>
                                </Reorder.Item>
                            ))}
                    </Reorder.Group>

                    {/* New Slide Form */}
                    <div
                        className="mt-16 space-y-4"
                    >
                        <textarea 
                            value={newSildeContent}
                            onChange={(e) => setNewSlideContent(e.target.value)}
                            placeholder="Write new slide content"
                            className="w-full h-32 p-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-purple-600"
                        />
                        <button
                            onClick={handleAddSlide}
                            className="bg-purple-600 hover:bg-purple-700 transition rounded-full px-6 py-3 text-white text-lg font-semibold shadow-lg"
                        >
                            + Add Slide
                        </button>
                    </div>
                </>
            )}
        </main>
    )
}