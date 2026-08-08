export interface ToolContent {
  heroTitle: string
  heroDescription: string
  trustItems?: { icon: string; title: string; description: string }[]
  benefits?: { icon: string; title: string; description: string }[]
  audience?: { icon: string; title: string; description: string }[]
  timelineSteps?: { icon: string; title: string; description: string }[]
  useCases?: { icon: string; title: string; description: string }[]
  faqs?: { q: string; a: string }[]
  toolWorkflow?: { title: string; slug: string; description: string; icon: string; active?: boolean }[]
}

export const toolContentRegistry: Record<string, ToolContent> = {
  "image-compressor": {
    heroTitle: "Compress Images Online Without Losing Quality",
    heroDescription: "Optimize your PNG, JPG, JPEG, WEBP, and BMP images directly in your browser. All computation executes locally on your device for absolute privacy and instantaneous processing speeds—no file uploads or signups required.",
    trustItems: [
      {
        icon: "lock",
        title: "Files never leave your browser",
        description: "All document processing scripts execute 100% locally inside your device memory sandbox.",
      },
      {
        icon: "zap",
        title: "Instant local processing",
        description: "Skip upload pipelines. Image optimization initiates the microsecond you choose settings.",
      },
      {
        icon: "wifiOff",
        title: "Works offline after loading",
        description: "Disconnect from the internet once loaded and continue compressing images in private.",
      },
      {
        icon: "shield",
        title: "No accounts or fees required",
        description: "Start optimizing files immediately. No registration, limits, or subscriptions.",
      },
    ],
    benefits: [
      {
        icon: "shield",
        title: "Compress Below 100KB",
        description: "Set quality precisely to hit strict government, academic, and corporate portal upload limits.",
      },
      {
        icon: "zap",
        title: "Batch Compression Ready",
        description: "Optimize and compress multiple images sequentially inside a single private session.",
      },
      {
        icon: "cpu",
        title: "Instant Local Execution",
        description: "Skip queue wait times. Computations run locally on your device's processor using WebAssembly.",
      },
      {
        icon: "eye",
        title: "Side-by-Side Live Preview",
        description: "Inspect output quality side-by-side and check estimated sizes before exporting.",
      },
      {
        icon: "wifiOff",
        title: "100% Offline Support",
        description: "No active internet needed. The tool runs completely client-side in sandboxed memory.",
      },
      {
        icon: "lock",
        title: "No Server Uploads",
        description: "Complete confidentiality. Your photos, scans, and documents never contact any external server.",
      },
    ],
    audience: [
      {
        icon: "graduationCap",
        title: "Students",
        description: "Quickly compress homework sheets, portal uploads, and assignments under strict size caps.",
      },
      {
        icon: "fileText",
        title: "Government Forms",
        description: "Fit passport photos, ID scans, and tax attachments under strict 50KB or 100KB document limits.",
      },
      {
        icon: "code",
        title: "Web Developers",
        description: "Convert bulky PNG directories to WebP vectors to boost page speed scores and rankings.",
      },
      {
        icon: "bookOpen",
        title: "Content Bloggers",
        description: "Optimize article covers and graphic attachments to provide instantaneous reader load speeds.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Upload Image",
        description: "Select or drag any PNG, JPG, or WEBP file directly into the local uploader workspace.",
      },
      {
        icon: "sliders",
        title: "Adjust Settings",
        description: "Fine-tune the output quality percentage and select your preferred file target format.",
      },
      {
        icon: "eye",
        title: "Live Preview",
        description: "Inspect original vs compressed quality differences and compare exact byte changes.",
      },
      {
        icon: "download",
        title: "Export & Save",
        description: "Save your optimized, privacy-safe image file instantly to your local downloads directory.",
      },
    ],
    useCases: [
      {
        icon: "globe",
        title: "Online Form Portals",
        description: "Compress applications requiring photo attachments with specific KB file constraints.",
      },
      {
        icon: "mail",
        title: "Email Attachments",
        description: "Shrink massive high-resolution camera assets to fit under default email client limits.",
      },
      {
        icon: "sparkles",
        title: "Website Assets",
        description: "Drastically reduce media payload sizes on Shopify, WordPress, or custom web pages.",
      },
      {
        icon: "camera",
        title: "Social Media Uploads",
        description: "Quickly resize high-res creative portfolio snapshots before uploading online.",
      },
    ],
    faqs: [
      {
        q: "How do I compress an image to under 100KB?",
        a: "Drag your file in, slide the quality scale down (typically to 50-70%), and check the 'Estimated Output' indicator at the bottom. Once it estimates less than 100KB, click 'Compress Image' and save your file.",
      },
      {
        q: "Will my image lose quality during compression?",
        a: "The tool utilizes advanced lossy compression scripts. At the default 80% quality setting, files are shrunk up to 70% in size with virtually zero human-visible differences in clarity.",
      },
      {
        q: "Are my photos uploaded to a third-party server?",
        a: "No. The entire optimization and format conversion executes inside your local browser memory space. No logs, analytics, or files are uploaded to any external server.",
      },
      {
        q: "What image formats are supported by TurnAnything?",
        a: "Our Image Compressor supports PNG, JPG, JPEG, WEBP, and BMP formats for both uploading and exporting compressed files.",
      },
      {
        q: "Can I use the Image Compressor offline?",
        a: "Yes. Once the page loads, the WebAssembly and JS logic remains cached in your browser. You can disconnect from the internet and continue compressing images without issues.",
      },
    ],
    toolWorkflow: [
      {
        title: "1. Compress Image",
        slug: "image-compressor",
        description: "Reduce image file size instantly.",
        icon: "minimize",
        active: true,
      },
      {
        title: "2. Convert Image",
        slug: "image-converter",
        description: "Convert format (JPG, PNG, WEBP).",
        icon: "repeat",
      },
      {
        title: "3. Image to PDF",
        slug: "image-to-pdf",
        description: "Compile images into PDF documents.",
        icon: "fileText",
      },
      {
        title: "4. Extract Text (OCR)",
        slug: "ocr",
        description: "Scan text from compiled documents.",
        icon: "search",
      },
      {
        title: "5. Background Removal",
        slug: "background-remover",
        description: "Isolate subject using local AI models.",
        icon: "wand",
      },
    ],
  },
  "pdf-merge": {
    heroTitle: "Merge PDF Files Online Securely in Browser",
    heroDescription: "Combine multiple PDF documents into a single organized PDF file. Processing runs completely offline in your local browser sandbox to keep sensitive contracts, financial statements, and personal records fully confidential.",
    benefits: [
      {
        icon: "shield",
        title: "Private Local Compilation",
        description: "Combine corporate agreements and bank statements without exposing raw records to cloud servers.",
      },
      {
        icon: "zap",
        title: "Zero Queue Times",
        description: "No backend upload pipelines. PDFs are compiled in milliseconds directly inside browser memory.",
      },
      {
        icon: "sliders",
        title: "Visual Page Reordering",
        description: "Easily drag and drop uploaded document items to match the exact sequential order you require.",
      },
    ],
    useCases: [
      {
        icon: "fileText",
        title: "Contract Assemblies",
        description: "Combine cover pages, signature files, and appendix sections into a single client-ready dossier.",
      },
      {
        icon: "graduationCap",
        title: "Academic Submissions",
        description: "Merge multiple scanned homework sheets or research assets before sending them to school portals.",
      },
      {
        icon: "lock",
        title: "Tax & Financial Folders",
        description: "Organize bank statements, receipts, and W2 scans into a single safe tax file.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Upload PDFs",
        description: "Drag and drop the PDF documents you want to merge into the uploader area.",
      },
      {
        icon: "sliders",
        title: "Drag & Reorder",
        description: "Arrange the document entries visually to define their order in the combined file.",
      },
      {
        icon: "fileText",
        title: "Set Output Name",
        description: "Choose a custom name for the merged output file before compiling it.",
      },
      {
        icon: "download",
        title: "Download Output",
        description: "Click 'Merge PDF' and save the combined PDF file instantly to your hard drive.",
      },
    ],
    faqs: [
      {
        q: "How many PDFs can I merge at once?",
        a: "Since TurnAnything runs client-side, there are no hard limits. You can combine dozens of files, bounded only by your browser's allocated memory space.",
      },
      {
        q: "Will my merged files lose resolution or layout quality?",
        a: "No. The tool uses a native binary PDF engine compiled to WebAssembly, ensuring all fonts, vector lines, and embedded images remain perfectly untouched.",
      },
      {
        q: "Are my contracts safe from being indexed by search engines?",
        a: "Yes. Because files are processed entirely in browser memory on your device, no data is stored or logged. Your confidential details remain 100% private.",
      },
    ],
  },
  "image-converter": {
    heroTitle: "Convert Image Formats Online 100% Privately",
    heroDescription: "Convert PNG, JPG, JPEG, WEBP, GIF, and BMP formats instantly inside your browser. No files are uploaded to our servers, keeping your graphics, scans, and family photos safe and secure.",
    benefits: [
      {
        icon: "zap",
        title: "Instant Conversion Engines",
        description: "Files compile locally on your GPU/CPU, converting huge images in milliseconds without network delay.",
      },
      {
        icon: "lock",
        title: "Full Privacy Assurance",
        description: "Photos are processed entirely on-device. Ideal for confidential ID cards and private document scans.",
      },
      {
        icon: "sparkles",
        title: "No Image Compression",
        description: "Maintains original image details and resolutions unless you choose to compress them.",
      },
    ],
    useCases: [
      {
        icon: "code",
        title: "Web Optimization (WebP)",
        description: "Convert bulky PNG or JPG assets to WEBP format to optimize page speed scores and rankings.",
      },
      {
        icon: "camera",
        title: "Photo Format Adjustments",
        description: "Easily switch camera assets between JPEG and PNG to meet specific submission guidelines.",
      },
      {
        icon: "graduationCap",
        title: "Identity Document Scans",
        description: "Safely convert photos of ID cards and certificates to standard formats for online applications.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Choose Images",
        description: "Select one or more images from your local system or drag them onto the page.",
      },
      {
        icon: "sliders",
        title: "Select Output Format",
        description: "Choose your target format, such as PNG, JPG, JPEG, WEBP, GIF, or BMP.",
      },
      {
        icon: "download",
        title: "Convert and Download",
        description: "Click the Action button to compile the files, then download the converted images.",
      },
    ],
    faqs: [
      {
        q: "Can I convert multiple images at once?",
        a: "Yes, you can upload multiple images and convert them sequentially inside a single private browser session.",
      },
      {
        q: "Does this converter support HEIC files?",
        a: "Currently, the converter supports PNG, JPG, JPEG, WEBP, GIF, and BMP. We are actively working on adding offline HEIC support.",
      },
      {
        q: "Do I need to sign up to use the image converter?",
        a: "No. TurnAnything is completely free and requires no registration or email. You can use it as much as you need.",
      },
    ],
  },
  "image-to-pdf": {
    heroTitle: "Convert Images to PDF Online Instantly",
    heroDescription: "Convert PNG, JPG, and WEBP images into a clean, multi-page PDF document locally. All compilation occurs inside your browser memory cache to guarantee absolute document privacy.",
    benefits: [
      {
        icon: "shield",
        title: "On-Device PDF Generation",
        description: "Your files never touch the cloud. Safely convert passports, driver licenses, and receipts to PDF.",
      },
      {
        icon: "zap",
        title: "Instant PDF Compiling",
        description: "Skip upload waiting lists. Image-to-PDF compilation completes instantly on your local processor.",
      },
      {
        icon: "sliders",
        title: "Flexible Page Reordering",
        description: "Reorder pages dynamically by dragging and dropping them before building the PDF document.",
      },
    ],
    useCases: [
      {
        icon: "fileText",
        title: "Document Scan Assembly",
        description: "Convert multiple scanned photos of contracts or identity documents into a single PDF submission.",
      },
      {
        icon: "graduationCap",
        title: "Homework Submissions",
        description: "Merge phone snapshots of written homework sheets into one neat PDF file for online grading portals.",
      },
      {
        icon: "mail",
        title: "Expense Receipts Tracking",
        description: "Compile screenshots and photos of payment receipts into a single monthly PDF expense sheet.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Add Images",
        description: "Drag and drop the images (PNG, JPG, or WEBP) that you want to convert to PDF.",
      },
      {
        icon: "sliders",
        title: "Sort Pages",
        description: "Arrange pages by dragging cards into the order you want them to appear in the PDF.",
      },
      {
        icon: "download",
        title: "Generate PDF",
        description: "Click 'Convert to PDF' and download your combined document instantly.",
      },
    ],
    faqs: [
      {
        q: "Can I convert high-resolution photos?",
        a: "Yes, the tool processes high-res photos. The rendering speed depends on your device's memory since it compiles locally.",
      },
      {
        q: "Are my uploaded photos safe from third-party tracking?",
        a: "Absolutely. No files are uploaded to any server. All processing runs in the browser, keeping your documents 100% private.",
      },
    ],
  },
  "video-to-audio": {
    heroTitle: "Extract Audio from Video Online Offline-Capable",
    heroDescription: "Extract high-quality MP3 audio from MP4, MOV, WEBM, AVI, and MKV videos directly inside your browser. No files are uploaded to the cloud, ensuring fast and private extraction.",
    benefits: [
      {
        icon: "lock",
        title: "100% Private Extraction",
        description: "Convert video recordings, lectures, and private clips without uploading huge payloads to external servers.",
      },
      {
        icon: "zap",
        title: "WASM-Powered FFMPEG",
        description: "Uses a native build of FFMPEG compiled to WebAssembly to perform audio extractions on your local hardware.",
      },
      {
        icon: "music",
        title: "High-Fidelity Audio",
        description: "Extracts original audio tracks directly, avoiding lossy transcoding steps where possible.",
      },
    ],
    useCases: [
      {
        icon: "bookOpen",
        title: "Lecture Recordings",
        description: "Convert massive class recordings into lightweight MP3 tracks to listen to on the go.",
      },
      {
        icon: "music",
        title: "Music Extractions",
        description: "Quickly extract background music or soundtracks from your creative video files.",
      },
      {
        icon: "camera",
        title: "Voice Notes Formatting",
        description: "Convert video voice memos into convenient audio clips for easier sharing.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Upload Video",
        description: "Choose a video file (MP4, MOV, WEBM, etc.) from your device.",
      },
      {
        icon: "sliders",
        title: "Configure Output",
        description: "Choose standard settings or format settings for extracting the audio.",
      },
      {
        icon: "download",
        title: "Extract MP3",
        description: "Let our local WASM engine extract the audio track and download it instantly.",
      },
    ],
    faqs: [
      {
        q: "What video formats are supported?",
        a: "You can upload MP4, MOV, WEBM, AVI, and MKV video formats. The engine will parse and extract the default audio track.",
      },
      {
        q: "Does it support video sizes above 100MB?",
        a: "Yes. Since the video is loaded locally into browser RAM, there are no file upload constraints. Large video files process easily.",
      },
    ],
  },
  "pdf-split": {
    heroTitle: "Split PDF Pages Online Privately in Browser",
    heroDescription: "Extract specific page ranges or split a PDF file into individual pages. Runs entirely on your local device to guarantee that confidential documents and records remain secure.",
    benefits: [
      {
        icon: "shield",
        title: "Bank-Grade Confidentiality",
        description: "Split legal contracts, tax records, and medical files without sending documents to third-party servers.",
      },
      {
        icon: "zap",
        title: "Instant Local Splitting",
        description: "Document splitting completes in a fraction of a second inside browser memory—no network upload required.",
      },
      {
        icon: "sliders",
        title: "Custom Range Selection",
        description: "Input specific pages (e.g., '1-3, 5') or split every single page into separate documents.",
      },
    ],
    useCases: [
      {
        icon: "fileText",
        title: "Extract Pages for Invoicing",
        description: "Separate single invoice pages or custom reports from a massive master PDF book.",
      },
      {
        icon: "graduationCap",
        title: "Academic Assignments",
        description: "Extract only the specific homework chapter from a multi-page textbook PDF.",
      },
      {
        icon: "lock",
        title: "Redact Sensitive Sections",
        description: "Separate public sections from private attachments before sharing a PDF file.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Upload PDF",
        description: "Select the PDF document you want to split and load it into the uploader.",
      },
      {
        icon: "sliders",
        title: "Select Split Range",
        description: "Enter the page numbers you want to extract, or select 'Split All Pages'.",
      },
      {
        icon: "download",
        title: "Extract & Download",
        description: "Click 'Split PDF' and instantly save your extracted PDF documents.",
      },
    ],
    faqs: [
      {
        q: "Is there a limit to how many pages I can split?",
        a: "No. Our split engine easily processes massive PDFs with hundreds of pages, executing locally on your device.",
      },
      {
        q: "Are the split files compressed?",
        a: "The tool preserves original page sizing and formats, extracting pages exactly as they are without quality degradation.",
      },
    ],
  },
  "zip-creator": {
    heroTitle: "Create ZIP Files Online Locally in Browser",
    heroDescription: "Compress multiple files into a single ZIP archive instantly. Runs 100% client-side, ensuring complete data security for confidential folders and archives.",
    benefits: [
      {
        icon: "lock",
        title: "Absolute File Privacy",
        description: "Archive contracts, photos, and files locally. No data is ever sent to external cloud servers.",
      },
      {
        icon: "zap",
        title: "Instant Archiving Speed",
        description: "Zip compression processes files in memory in milliseconds without network upload delay.",
      },
      {
        icon: "sparkles",
        title: "No Signups or Limits",
        description: "Free and unlimited file zipping with zero ads or annoying account requirements.",
      },
    ],
    useCases: [
      {
        icon: "mail",
        title: "Email Folder Bundles",
        description: "Compress multiple document scans or design assets into one ZIP file to fit email attachments.",
      },
      {
        icon: "graduationCap",
        title: "Academic Submissions",
        description: "Archive multiple research papers and code structures before uploading them to grading portals.",
      },
      {
        icon: "code",
        title: "Codebase Packaging",
        description: "Quickly bundle project directories and text files into standard ZIP archives for client deliveries.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Choose Files",
        description: "Select multiple files from your device to add them to your archive workspace.",
      },
      {
        icon: "sliders",
        title: "Configure ZIP",
        description: "Name your archive and verify the uploaded files before packaging.",
      },
      {
        icon: "download",
        title: "Download ZIP",
        description: "Click 'Create ZIP' and save the compiled archive folder instantly.",
      },
    ],
    faqs: [
      {
        q: "Does this ZIP tool upload my files?",
        a: "No. Zipping runs entirely in your browser using local client-side Javascript. Your files stay on your machine.",
      },
      {
        q: "Is there a limit on archive size?",
        a: "The file limit is determined by your system's RAM capacity. The tool comfortably archives folders up to 500MB.",
      },
    ],
  },
  "zip-extractor": {
    heroTitle: "Extract ZIP Files Online Safely in Browser",
    heroDescription: "Unzip and extract files from ZIP archives instantly. Processing runs completely on your local device to keep your sensitive files and folders secure.",
    benefits: [
      {
        icon: "lock",
        title: "Confidential Extraction",
        description: "Open unknown ZIP archives safely. Extracted contents are kept entirely local inside browser memory.",
      },
      {
        icon: "zap",
        title: "Instant Unzipping",
        description: "Files are extracted instantly on your local processor, skipping slow server-side uploads.",
      },
      {
        icon: "sparkles",
        title: "No Tool Installation",
        description: "Unzip folders on any device (ChromeOS, Mobile, Tablet) without installing WinRAR or 7-Zip.",
      },
    ],
    useCases: [
      {
        icon: "fileText",
        title: "Inspect Archive Files",
        description: "Quickly unzip attachments received via email or messaging apps to view their files.",
      },
      {
        icon: "graduationCap",
        title: "Student Assignments",
        description: "Extract downloaded course materials, lectures, and resources directly on your mobile device.",
      },
      {
        icon: "code",
        title: "Web Assets Deployment",
        description: "Extract zipped library assets and source directories without needing desktop system access.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Select ZIP File",
        description: "Drag and drop or select the ZIP archive you want to extract.",
      },
      {
        icon: "sliders",
        title: "Inspect Contents",
        description: "View the file tree structure and names of the zipped files on your screen.",
      },
      {
        icon: "download",
        title: "Save Files Locally",
        description: "Select individual files or extract the whole archive to save files to your computer.",
      },
    ],
    faqs: [
      {
        q: "Are my extracted files shared with anyone?",
        a: "No. All extraction occurs locally inside your browser's sandboxed environment. Your files are never sent to our servers.",
      },
      {
        q: "Can I open password-protected ZIP files?",
        a: "Standard unencrypted ZIP archives are fully supported. Encrypted files will require password support in future updates.",
      },
    ],
  },
  "ocr": {
    heroTitle: "Image to Text OCR Online Secure and Local",
    heroDescription: "Extract editable text from JPG, PNG, WEBP, and BMP images instantly. The OCR processing runs completely offline inside your browser, keeping your documents confidential.",
    benefits: [
      {
        icon: "lock",
        title: "Secure Data Extraction",
        description: "Scan contracts, invoices, and IDs safely. No document images or text are sent to the cloud.",
      },
      {
        icon: "zap",
        title: "Tesseract.js Engine",
        description: "Uses a native optical character recognition (OCR) script that runs locally on your device CPU.",
      },
      {
        icon: "sparkles",
        title: "Copyable Text Output",
        description: "Instantly copy extracted text or export it as text files directly to your device.",
      },
    ],
    useCases: [
      {
        icon: "fileText",
        title: "Invoice Data Capture",
        description: "Extract text and numbers from invoices, receipts, and billing scans without manual typing.",
      },
      {
        icon: "graduationCap",
        title: "Book & Note Scans",
        description: "Convert pictures of textbook pages and handwriting sheets into copyable study notes.",
      },
      {
        icon: "code",
        title: "Developer Code Snippets",
        description: "Extract raw code text from screenshots and video tutorials on the fly.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Choose Scan Image",
        description: "Drag and drop any image scan (PNG, JPG, WEBP) containing text.",
      },
      {
        icon: "sliders",
        title: "Run Local OCR",
        description: "Let our local client-side script read and extract the text from the image.",
      },
      {
        icon: "download",
        title: "Copy Text Output",
        description: "Inspect the final extracted text and copy it to your clipboard or download it.",
      },
    ],
    faqs: [
      {
        q: "Does OCR run on a server?",
        a: "No. The OCR engine (Tesseract.js) compiles directly in the browser and processes the image locally. Your files remain private.",
      },
      {
        q: "What languages are supported?",
        a: "The local OCR engine default configuration supports English text recognition. Multilingual support will be added in updates.",
      },
    ],
  },
  "background-remover": {
    heroTitle: "Remove Image Backgrounds Online 100% Locally",
    heroDescription: "Isolate subjects and remove backgrounds from PNG, JPG, and WEBP images instantly. Powered by local AI models running directly in your browser.",
    benefits: [
      {
        icon: "lock",
        title: "Privacy-Safe Removals",
        description: "Remove backgrounds from profile pics, products, and scans without cloud uploads.",
      },
      {
        icon: "zap",
        title: "TensorFlow AI Engine",
        description: "Computes background clipping masks locally on your GPU/CPU using sandboxed neural networks.",
      },
      {
        icon: "sparkles",
        title: "Transparent PNG Output",
        description: "Saves high-quality cutouts with transparent backgrounds ready for design layouts.",
      },
    ],
    useCases: [
      {
        icon: "camera",
        title: "Product Listing Photos",
        description: "Remove background clutter from product photos for Shopify, eBay, or Amazon listings.",
      },
      {
        icon: "users",
        title: "Profile & Portrait Edits",
        description: "Create neat, professional headshots with transparent backgrounds for resumes and bios.",
      },
      {
        icon: "sparkles",
        title: "Creative Graphic Collages",
        description: "Isolate subjects from graphics to build overlays, posters, and marketing assets.",
      },
    ],
    timelineSteps: [
      {
        icon: "upload",
        title: "Choose Photo",
        description: "Drag and drop your image file (PNG, JPG, WEBP) into the workspace.",
      },
      {
        icon: "sliders",
        title: "AI Segmentation",
        description: "Our local neural net processes the image to isolate subjects from background pixels.",
      },
      {
        icon: "download",
        title: "Export Transparent PNG",
        description: "Download the final transparent PNG cutout directly to your device.",
      },
    ],
    faqs: [
      {
        q: "Does background removal upload my photos?",
        a: "No. All neural network processing (BodyPix/TensorFlow) executes locally inside your browser cache. Your data remains fully secure.",
      },
      {
        q: "Is it free to use?",
        a: "Yes, background removal is completely free with no limits, watermarks, or account subscriptions.",
      },
    ],
  },
}

export function getToolContentBySlug(slug: string): ToolContent {
  const defaultContent: ToolContent = {
    heroTitle: "Free Local Online Tool Utility",
    heroDescription: "Process your files secure, fast, and entirely inside your browser memory cache. TurnAnything delivers premium desktop utilities right to your web browser with zero server uploads.",
  }
  return toolContentRegistry[slug] || defaultContent
}
