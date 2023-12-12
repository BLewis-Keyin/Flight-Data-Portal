const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getActors() {
  if(DEBUG) console.log("actors.mongo.dal.getActors()");
  try {
    await dal.connect();
    const cursor = dal.db("Auth").collection("actor").find();
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  } finally {
    dal.close();
  }
};
async function getActorByActorId(id) {
  if(DEBUG) console.log("actors.mongo.dal.getActorByActorId()");
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("actor");
    const result = await collection.find({ _id: new ObjectId(id) }).toArray();
    if(DEBUG) console.log(result);
    return result;
  } catch(error) {
    console.error('Error occurred while connecting to MongoDB:', error);
    throw error;
  } finally {
    dal.close();
  }
};
async function addActor(firstName, lastName) {
  if(DEBUG) console.log("actors.mongo.dal.addActor()");
  let newActor = JSON.parse(`{ "first_name": "` + firstName + `", "last_name": "` + lastName + `" }`);
  if(DEBUG) console.log(newActor);
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("actor").insertOne(newActor);
    return result.insertedId;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};

async function putActor(id, fname, lname) {
  if(DEBUG) console.log("actors.mongo.dal.putActor()");
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("actor")
      .replaceOne({_id: new ObjectId(id)},
        {first_name: fname, last_name: lname}
        );
    return result;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};
async function patchActor(id, fname, lname) {
  if(DEBUG) console.log("actors.mongo.dal.patchActor()");
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("actor")
      .updateOne({_id: new ObjectId(id)},
        {$set: {first_name: fname, last_name: lname}},
        {upsert: true, returnDocument: 'after'}
        );
    return result;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};
async function deleteActor(id) {
  if(DEBUG) console.log("actors.mongo.dal.deleteActor()");
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("actor").deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};

module.exports = {
    getActors,
    getActorByActorId,
    addActor,
    putActor,
    patchActor,
    deleteActor,
  }