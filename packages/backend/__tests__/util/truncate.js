import redis from 'redis';
import database from '../../src/database';

export default function truncate() {
  return Promise.all([
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    }),
    redis
      .createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
      .subscribe('clean_cache'),
  ]);
}
