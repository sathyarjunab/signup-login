import mongoose from "mongoose";

export class MongoDbLibrary {
  private connectionCount = 0;
  private connection: typeof mongoose | undefined;

  constructor() {
    process.on("SIGINT", async () => {
      console.log("the data base is disconnecting");
      await this.connection?.disconnect();
      console.log("the data base is disconnected");
    });
  }

  public async makeConnection(callBackOnConnection: () => void) {
    try {
      if (this.connection) {
        return this.connection;
      }
      const url: string = this.getConnectionString();
      this.connectionCount += 1;
      console.log("connecting to DB...");
      this.connection = await mongoose.connect(url);
      console.log("connected to DB");
      callBackOnConnection();
      return this.connection;
    } catch (err: any) {
      if (this.connectionCount > 3) {
        throw new Error(err);
      }
      this.makeConnection(callBackOnConnection);
    }
  }

  protected getConnectionString() {
    return [
      "mongodb+srv://",
      process.env.DB_NAME,
      ":",
      process.env.DB_PASSWORD,
      "@cluster0.iilzqdk.mongodb.net/",
      "staging",
    ].join("");
  }
}
