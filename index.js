
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes.js';
import attendeeRoutes from './routes/attendeeRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './db.js';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const app = express();
app.use(fileUpload()); 
app.use(express.static(path.join(__dirname, "./frontend/build")));
//routes
// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });
const PORT=8080;
app.listen(PORT,()=>{
    console.log("App is Working");

})
