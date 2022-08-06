import { ObjectId } from "bson";
import Exclude from "./exclude";

interface Extension {
  userId: ObjectId;
  excludedWebsites?: Exclude[];
}

export default Extension;
