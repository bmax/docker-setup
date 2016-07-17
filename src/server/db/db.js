import r from 'rethinkdb';

const dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'vesta',
  tables: {
    'users': 'name'
  }
};

export function setup() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, (err, connection) => {
    if(err) {
      console.log("Could not connect to database");
      return;
    }
    r.dbCreate(dbConfig.db).run(connection, (err, result) => {
      if(err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
      } else { console.log("[INFO ] RethinkDB database '%s' created", dbConfig.db); }
      Object.keys(dbConfig.tables).forEach(table => {
        r.db(dbConfig.db).tableCreate(table, {primaryKey: dbConfig.tables[table]}).run(connection, (err, result) => {
          if(err) {
            console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", table, err.name, err.msg, err.message);
          } else { console.log("[INFO ] RethinkDB table '%s' created", table); }
        });
      });
    });
  });
}

export function findUser(user, callback) {
  onConnect((err, connection) => {
    r.db(dbConfig.db).table('users').get(user).run(connection, (err, result) => {
      if(err) {
        console.log("[ERROR][%s][findUserById] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, null);
      } else { callback(null, result); }
      connection.close();
    });
  });
};

export function findUserByEmail(email, callback) {
  onConnect((err, connection) => {
    r.db(dbConfig.db).table('users').filter({'email': email}).limit(1).run(connection, (err, cursor) => {
      if(err) { callback(err) }
      else {
        cursor.next((err, row) => {
          if(err) { callback(null, null); }
          else { callback(null, row); }
          connection.close();
        });
      }
    });
  });
};

export function saveUser(user, callback) {
  onConnect((err, connection) => {
    r.db(dbConfig.db).table('users').insert(user).run(connection,(err, result) => {
      if(err) { callback(err); }
      else {
        if (result.inserted === 1) { callback(null, user); }
        else { callback(null, null); }
      }
      connection.close();
    });
  });
};


function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, (err, connection) => {
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}
