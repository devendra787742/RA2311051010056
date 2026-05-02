const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend Running ");
});

let notifications = [];

app.post("/notifications", (req, res) => {
  const data = { id: Date.now(), ...req.body, isRead: false };
  notifications.push(data);
  res.json(data);
});

app.get("/notifications/:userId", (req, res) => {
  const userData = notifications.filter(
    n => n.userId == req.params.userId
  );
  res.json(userData);
});

app.patch("/notifications/:id/read", (req, res) => {
  notifications = notifications.map(n =>
    n.id == req.params.id ? { ...n, isRead: true } : n
  );
  res.json({ message: "Marked as read" });
});

app.listen(3000, () => console.log("Server running"));