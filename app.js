import express from "express"
import http from "http"
import { Server } from "socket.io"
import path from "path"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.set("view engine", "ejs")
// app.set(express.static(path.join(__dirname, "public")))
app.use(express.static(path.resolve("./public")))

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receiver-location", { id: socket.id, ...data })
  })

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id)
  })
})

app.get("/", function (req, res) {
  res.render("index")
})

server.listen(3000, () => {
  console.log("app listing on port 3000")
})
