import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Forward requests to auth-service
app.use("/api/auth", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error in auth service" });
    }
});

// Forward requests to project-service
app.use("/api/projects", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:6000/api/projects", { headers: req.headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error in project service" });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
