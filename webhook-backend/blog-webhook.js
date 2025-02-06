//require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const {createClient} = require("contentful-management");
const nodemailer = require("nodemailer");
const { exec } = require('child_process');
const app = express();
const SPACE_ID = "mh2zs9urj0ep"
const CMA_TOKEN = "CFPAT-sePdw4VS0IP9XWwOZ8KhKkzLwyq4DBASeJvEAu97SXU"
const corsOptions = {
    origin: ['https://blog.everysim.io'], 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.json({ type: 'application/json' })); 
app.use(express.json({ type: 'application/vnd.contentful.management.v1+json' })); 

const client = createClient({
    accessToken: CMA_TOKEN,
});

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

app.post('/api/subscribe', async (req, res)=>{
    const {email} = req.body;
    if (!email) return res.setMaxListeners(400).json({error:"Email is required"});

    try{
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment("master");
        const entry = await environment.createEntry("subscribers",{
            fields:{
                email:{"en-US":email},
            }
        });
        await entry.publish();
        res.status(200).json({success:true, message:"Subscription successful"})
    }
    catch(error){
        console.error('Subscription error:', error);
        res.status(500).json({error:"failed to subscribe"})
    }
})

app.listen(4000, () => {
    console.log('Webhook listener running on port 4000');
});
