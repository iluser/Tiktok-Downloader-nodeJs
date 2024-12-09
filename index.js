const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ANSI escape codes for colored text
const Colors = {
    HEADER: '\x1b[95m',
    OKBLUE: '\x1b[94m',
    OKCYAN: '\x1b[96m',
    OKGREEN: '\x1b[92m',
    WARNING: '\x1b[93m',
    FAIL: '\x1b[91m',
    ENDC: '\x1b[0m',
    BOLD: '\x1b[1m',
    UNDERLINE: '\x1b[4m'
};

// Function to sanitize filename
function sanitizeFilename(filename) {
    return filename.replace(/[\\/*?:"<>|]/g, '_');
}

// Function to download TikTok videos in bulk
async function bulkDownload(apiUrl, inputFile, outputFolder) {
    // Ensure the output folder exists
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Mendapatkan nomor terakhir dari file yang sudah ada
    let lastFileNumber = 0;
    const files = fs.readdirSync(outputFolder);
    for (const file of files) {
        const match = file.match(/^(\d+)_/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > lastFileNumber) lastFileNumber = num;
        }
    }

    // Baca URLs dan simpan ke array
    let urls = fs.readFileSync(inputFile, 'utf8').split('\n').filter(Boolean);
    let remainingUrls = [...urls];

    for (let index = 0; index < urls.length; index++) {
        const videoUrl = urls[index].trim();
        if (!videoUrl) continue;

        try {
            console.log(`${Colors.OKBLUE}Processing URL ${index + 1}/${urls.length}: ${videoUrl}${Colors.ENDC}`);
            
            const response = await axios.post(apiUrl, { url: videoUrl });
            const data = response.data;

            // Extract video URL
            const medias = data.medias || [];
            let videoLink = null;
            for (const media of medias) {
                if (media.type === 'video' && media.quality === 'hd_no_watermark') {
                    videoLink = media.url;
                    break;
                }
            }

            if (!videoLink) {
                console.log(`${Colors.WARNING}No video with 'hd_no_watermark' quality found for URL: ${videoUrl}${Colors.ENDC}`);
                continue;
            }

            // Prepare filename using incremented lastFileNumber
            const author = data.author || 'unknown_author';
            const title = data.title || 'unknown_title';
            const fileNumber = lastFileNumber + index + 1;
            const sanitizedFilename = sanitizeFilename(`${fileNumber}_${author} - ${title}.mp4`);
            const videoFilename = path.join(outputFolder, sanitizedFilename);

            console.log(`${Colors.OKGREEN}Downloading video from CDN: ${videoLink}${Colors.ENDC}`);

            // Download video
            const videoResponse = await axios.get(videoLink, { responseType: 'stream' });
            const writer = fs.createWriteStream(videoFilename);
            
            await new Promise((resolve, reject) => {
                videoResponse.data.pipe(writer);
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`${Colors.BOLD}✅ Downloaded: ${videoFilename}${Colors.ENDC}`);
            
            // Hapus URL yang berhasil didownload dari array
            remainingUrls = remainingUrls.filter(url => url.trim() !== videoUrl);
            
            // Update file urls.txt dengan URL yang tersisa
            fs.writeFileSync(inputFile, remainingUrls.join('\n'));

        } catch (error) {
            console.error(`${Colors.FAIL}Error processing URL ${videoUrl}: ${error.message}${Colors.ENDC}`);
        }
    }
}

// Main function to execute the bulk download
(async function () {
    // API URL for TikTok downloader
    const apiUrl = "https://myapi.app/api/analyze";

    // Input file containing TikTok URLs
    const inputFile = "urls.txt";

    // Output folder to save videos
    const outputFolder = "downloads";

    await bulkDownload(apiUrl, inputFile, outputFolder);
})();
