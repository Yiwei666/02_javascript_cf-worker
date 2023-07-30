const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const videoPath = '/home/01_html/02_douyVideo/';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/videos', (req, res) => {
  fs.readdir(videoPath, (err, files) => {
    if (err) {
      console.error('Error reading video directory:', err);
      return res.status(500).send('Internal Server Error');
    }

    const videos = files.filter(file => file.endsWith('.mp4'));
    res.json(videos);
  });
});

app.get('/videos/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoFile = path.join(videoPath, videoName);

  fs.exists(videoFile, (exists) => {
    if (!exists) {
      return res.status(404).send('Video not found');
    }

    res.sendFile(videoFile);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
