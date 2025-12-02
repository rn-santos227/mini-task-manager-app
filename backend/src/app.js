import { express } from "express";
import { cors } from "cors";

import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
