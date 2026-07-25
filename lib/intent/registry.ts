import type { IntentDefinition } from "./types"



export const intentRegistry: IntentDefinition[] = [
  {
    slug: "pdf-merge",
    title: "PDF Merge",
    examples: [
      "merge pdf files",
      "combine two pdfs",
      "join pdf documents",
      "merge multiple pdfs",
    ],
    keywords: [
      "pdf",
      "merge",
      "combine",
      "join",
      "documents",
      "files",
    ],
  },

  {
    slug: "image-converter",
    title: "Image Converter",
    examples: [
      "convert image",
      "jpg to png",
      "png to jpg",
      "webp to png",
      "png to webp",
      "change image format",
    ],
    keywords: [
      "image",
      "convert",
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "bmp",
      "format",
    ],
  },

  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    examples: [
      "convert image to pdf",
      "turn photos into pdf",
      "combine images into pdf",
      "scan to pdf",
    ],
    keywords: [
      "image",
      "images",
      "photo",
      "photos",
      "jpg",
      "jpeg",
      "png",
      "webp",
      "pdf",
    ],
  },

  {
    slug: "video-to-audio",
    title: "Video to MP3",
    examples: [
      "convert video to mp3",
      "extract audio",
      "movie to mp3",
      "video into audio",
      "lecture video to mp3",
    ],
    keywords: [
      "video",
      "mp4",
      "mov",
      "movie",
      "audio",
      "mp3",
      "extract",
      "webm",
      "avi",
      "mkv",
    ],
  },

  // Future tools

  {
    slug: "meeting-to-action-items",
    title: "Meeting to Action Items",
    examples: [
      "meeting notes",
      "action items",
      "turn meeting into tasks",
      "summarize a meeting",
    ],
    keywords: [
      "meeting",
      "notes",
      "action items",
      "tasks",
      "todo",
      "summary",
      "transcript",
    ],
  },

  {
    slug: "pdf-to-flashcards",
    title: "PDF to Flashcards",
    examples: [
      "turn my pdf into flashcards",
      "study cards from pdf",
      "convert pdf to flashcards",
      "anki cards",
    ],
    keywords: [
      "pdf",
      "flashcards",
      "flashcard",
      "study",
      "anki",
      "notes",
      "quiz",
    ],
  },

  {
    slug: "resume-to-portfolio",
    title: "Resume to Portfolio",
    examples: [
      "resume to portfolio",
      "cv to portfolio",
      "turn resume into website",
      "portfolio from resume",
    ],
    keywords: [
      "resume",
      "cv",
      "portfolio",
      "website",
      "personal site",
      "profile",
    ],
  },
  {
  slug: "pdf-split",
  title: "PDF Split",
  examples: [
    "split pdf",
    "extract pages from pdf",
    "separate pdf pages",
    "split my document",
  ],
  keywords: [
    "split",
    "pdf",
    "extract",
    "pages",
    "document",
    "page",
  ],
},
{
  slug: "zip-creator",
  title: "ZIP Creator",
  examples: [
    "zip my files",
    "compress files",
    "create zip",
    "archive files",
  ],
  keywords: [
    "zip",
    "archive",
    "compress",
    "files",
    "folder",
  ],
},
]