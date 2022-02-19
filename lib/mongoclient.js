import { MongoClient } from "mongodb";

let cachedClientMarketMaps = null;
let cachedDbMarketMaps = null;

export async function connectToMarketMapsDatabase() {
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  let uriString = "";
  let dbname = "";

  uriString = process.env.MARKET_MAPS_MONGODB_URI;
  dbname = process.env.MARKET_MAPS_MONGODB_DB;

  // Connect to cluster
  let client = new MongoClient(uriString, opts);
  await client.connect();
  let db = client.db(dbname);

  // set cache
  cachedClientMarketMaps = client;
  cachedDbMarketMaps = db;

  return {
    client: cachedClientMarketMaps,
    db: cachedDbMarketMaps,
  };
}

let cachedClientNeighborhood = null;
let cachedDbNeighborhood = null;

export async function connectToNeighborhoodsDatabase(stateid) {
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  let uriString = "";
  let dbname = "";

  if (stateid < 36) {
    uriString = process.env.NEIGHBORHOODS_MONGODB_URI;
    dbname = process.env.NEIGHBORHOODS_MONGODB_DB;
  } else {
    uriString = process.env.NEIGHBORHOODS_MONGODB_URI2;
    dbname = process.env.NEIGHBORHOODS_MONGODB_DB2;
  }

  // Connect to cluster
  let client = new MongoClient(uriString, opts);
  await client.connect();
  let db = client.db(dbname);

  // set cache
  cachedClientNeighborhood = client;
  cachedDbNeighborhood = db;

  return {
    client: cachedClientNeighborhood,
    db: cachedDbNeighborhood,
  };
}

let cachedClientMarkets = null;
let cachedDbMarkets = null;

export async function connectToMarketsDatabase() {
  // check the cached.
  if (cachedClientMarkets && cachedDbMarkets) {
    // load from cache
    return {
      client: cachedClientMarkets,
      db: cachedDbMarkets,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(process.env.MARKETS_MONGODB_URI, opts);
  await client.connect();
  let db = client.db(process.env.MARKETS_MONGODB_DB);

  // set cache
  cachedClientMarkets = client;
  cachedDbMarkets = db;

  return {
    client: cachedClientMarkets,
    db: cachedDbMarkets,
  };
}
