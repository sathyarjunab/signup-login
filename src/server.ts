import { createApp } from "./index.ts";
import { MongoDbLibrary } from "./mongodb-connection.ts";

const port = process.env.PORT ?? 3000;

const mongo = new MongoDbLibrary();
mongo
  .makeConnection(() => {
    const app = createApp();
    app.listen(port, () => {
      console.log(`server is running on the port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
