// const app = require(".");
// const { connectDb } = require("./config/db");


// const PORT=5454;
// app.listen(PORT, async()=>{
//     await connectDb();
//     console.log("store api listening on PORT :", PORT)


// })

const app = require(".");
const { connectDb } = require("./config/db");

const PORT = 5454;

(async () => {
  try {
    // Connect to the database first
    await connectDb();
    console.log("Connected to the database successfully.");

    // Start the server after a successful connection
    app.listen(PORT, () => {
      console.log("Store API listening on PORT:", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with a failure code
  }
})();


