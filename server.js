const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');

const app = express();

app.get('/hello-world', (req, res) => {
    res.send('hello world');
});



// Middleware to parse JSON body
app.use(bodyParser.json());

// POST API to get video aspect ratio (width / height)
app.get('/video-ratio', (req, res) => {
    // const { url } = req.body; // Get video URL from POST body

    const url = req.query.url; // Get video URL from query parameters

    try{
        if (!url) {
            return res.status(400).json({ error: 'Video URL is required' });
        }

        ffmpeg.ffprobe(url, (err, metadata) => {
            if (err) {
                console.error('Error fetching video metadata:', err);
                return res.status(500).json({ error: 'Failed to fetch video metadata' });
            }

            // Get video dimensions (width, height)
            const width = metadata.streams[0].width;
            const height = metadata.streams[0].height;

            // Calculate aspect ratio
            const aspectRatio = width / height;

            // Return video width, height, and aspect ratio
            res.json({
                width,
                height,
                aspectRatio
            });
        });
    }catch(error){
        console.log(error);
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
