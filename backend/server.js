const app = require('./app')
require("dotenv").config()
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log("Server is listening");
    
})