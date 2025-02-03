const express = require('express');
const { exec } = require('child_process');
const app = express();


app.use(express.json({ type: 'application/json' })); // Ensure JSON parsing
app.use(express.json({ type: 'application/vnd.contentful.management.v1+json' })); // Explicitly support Contentful’s type


app.post('/api/webhook', (req, res) => {
    console.log('Webhook received:', req.body.fields);

    exec('npm run build', { cwd: '..' }, (err, stdout, stderr) => {
        if (err) {
            console.error('Build error:', stderr);
            return res.status(500).send('Build failed');
        }
        console.log('Build successful:', stdout);


        exec('pm2 restart everyblog', (pm2Err, pm2Stdout, pm2Stderr) => {
            if (pm2Err) {
                console.error('PM2 restart error:', pm2Stderr);
                return res.status(500).send('PM2 restart failed');
            }
            console.log('PM2 restart successful:', pm2Stdout);
            res.status(200).send('Build and PM2 restart triggered');
        });
    });
});

app.listen(4000, () => {
    console.log('Webhook listener running on port 4000');
});
