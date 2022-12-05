const express = require("express");
const app = express()
const cookiePaser = require("cookie-parser")
const connectDB = require("./db")
require("dotenv").config()

const PORT = process.env.PORT  || 5200;
const authRouter = require("./api/auth/router")
const sessionExplorerRouter = require("./api/session-explorer/router")
const { routerTest } = require("./api/testroute")

app.use(express.json())
app.use(cookiePaser())


app.get("/", (req, res) => res.send("welcome"))
app.use("/test", (req,res) => res.send("from test !"))
app.use("/api", routerTest)
app.use("/api", sessionExplorerRouter)
app.use("/api/auth", authRouter)

connectDB()

app.listen(PORT, () => console.log("server  a demarer "))


