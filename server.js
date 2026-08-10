const express = require("express");

const app = express();

const PORT = 3000;


// Middleware
app.use(express.json());


// Temporary user data
let users = [
    {
        id: 1,
        name: "Sheetal",
        email: "sheetal@example.com"
    }
];


// =========================
// GET API
// =========================

app.get("/api/users", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });

});


// =========================
// GET SINGLE USER
// =========================

app.get("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    }

    res.status(200).json({
        success: true,
        data: user
    });

});


// =========================
// POST API
// =========================

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;


    // Basic validation
    if (!name || !email) {

        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });

    }


    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address"
        });

    }


    const newUser = {

        id: users.length + 1,

        name: name.trim(),

        email: email.trim()

    };


    users.push(newUser);


    res.status(201).json({

        success: true,

        message: "User created successfully",

        data: newUser

    });

});


// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "DecodeLabs Project 2 API is running"

    });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
