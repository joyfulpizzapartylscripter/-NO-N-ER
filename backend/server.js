const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const signs = [
    "Hello. This is the infinite maze.",
    "Turn around",
    "...",
    "Dude.",
    "Tip: if you see a random sign that says \"Ø\", keep moving.",
    "Tip: if a sign has a typo in it, Never touch it.",

    "H I touch me",
    "im very trustable. YeS.",
    "KOkacola",
    "Fip: p4ess w to continus",
    "ConnECRT",
    "ÆøČ̣z"
];

app.get("/sign", (req, res) => {
    const random = signs[Math.floor(Math.random() * signs.length)];
    res.json({ sign: random });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
