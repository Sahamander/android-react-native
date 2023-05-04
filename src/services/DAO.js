import * as SQLite from 'expo-sqlite';
import { Disc } from '../models/Disc';

export class DAO {
  db = null;
  constructor() {
    this.db = SQLite.openDatabase('discs.db');

    this.db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists discs (id integer primary key not null, image text, title text, artist text, genre text, tracks text, year text);',
      );
    });
  }

  addDisc(disc) {
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into discs (image, title, artist, genre, tracks, year) values (?, ?, ?, ?, ?, ?);',
          [
            disc.image,
            disc.title,
            disc.artist,
            disc.genre,
            disc.tracks,
            disc.year,
          ],
        );
      },
      null,
      this.update,
    );
  }

  // return all discs
  getDiscs() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'select * from discs;',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          reject,
        );
      });
    });
  }

  getFirstTenDiscs() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'select * from discs limit 10;',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          reject,
        );
      });
    });
  }

  // flush the database
  flush() {
    this.db.transaction((tx) => {
      tx.executeSql('delete from discs;');
    });
  }
}
