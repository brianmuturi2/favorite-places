import * as SQLite from 'expo-sqlite';
import {Place} from '../models/place';

const database = SQLite.openDatabase('places.db');

export function initDB() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
                [],
                () => {
                    resolve('sucess');
                },
                (_, error) => {
                    reject(error)
                });
        });
    });
    return promise;
}

export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
       database.transaction((tx) => {
           tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
               [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
               (_, result) => {
                resolve(result)
               },
               (_, error) => {
                reject(error);
               }
           )
       });
    });
    return promise;
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places`, [],
                (_, results) => {
                    const places = results.rows._array.map(place => new Place(place.title, place.imageUri, {address: place.address, lat: place.lat, lng: place.lng}, place.id))
                    resolve(places);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function fetchPlaceDetails(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places WHERE id = ?`, [id],
                (_, results) => {
                    const places = results.rows._array.map(place => new Place(place.title, place.imageUri, {address: place.address, lat: place.lat, lng: place.lng}, place.id));
                    resolve(places[0]);
                },
                (_, error) => {
                    reject(error);
                }
            );
        })
    });
    return promise;
}
