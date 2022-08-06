interface Extension {
  _id: ObjectId;
  userId: ObjectId;
  excludedWebsites: Exclude[]
}

export default Extension;
