import type { IntentDefinition } from "./types"

export const intentRegistry: IntentDefinition[] = [
	{
		slug: "image-to-pdf",
		title: "Image to PDF",
		examples: ["convert image to pdf", "turn photos into a pdf", "combine images into pdf", "scan to pdf"],
		keywords: ["image", "images", "photo", "photos", "jpg", "jpeg", "png", "webp", "pdf"],
	},
	{
		slug: "video-to-audio",
		title: "Video to MP3",
		examples: ["convert video to mp3", "extract audio", "lecture video", "movie audio"],
		keywords: ["video", "mp4", "mov", "movie", "extract audio", "mp3", "audio", "webm", "avi", "mkv"],
	},
	{
		slug: "meeting-to-action-items",
		title: "Meeting to Action Items",
		examples: ["meeting notes", "action items", "turn meeting into tasks", "summarize a meeting"],
		keywords: ["meeting", "notes", "action items", "tasks", "todo", "summary", "transcript"],
	},
	{
		slug: "pdf-to-flashcards",
		title: "PDF to Flashcards",
		examples: ["turn my pdf into flashcards", "study cards from pdf", "convert pdf to flashcards", "anki cards"],
		keywords: ["pdf", "flashcards", "flashcard", "study cards", "anki", "notes", "quiz"],
	},
	{
		slug: "resume-to-portfolio",
		title: "Resume to Portfolio",
		examples: ["resume to portfolio", "cv to portfolio", "turn resume into website", "portfolio from resume"],
		keywords: ["resume", "cv", "portfolio", "website", "personal site", "profile"],
	},
]
