import {
  View,
  Text,
  ToastAndroid,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { Searchbar, Button, IconButton } from 'react-native-paper';
import { DAO } from '../services/DAO';
import { Disc } from '../models/Disc';

const apikey = '4c59c8bd3008b8aa06511ee38cede2c2';

const myfetch = (search) =>
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${search}&api_key=${apikey}&format=json`,
  ).then((res) => res.json());

const Item = ({ title, image, artist, genre, tracks, year }) => (
    <View style={styles.item}>
        <Image
            source={{
                uri: image || 'https://cdn-icons-png.flaticon.com/512/18/18471.png',
            }}
            style={styles.itemImage}
        />
        <Text style={styles.itemTitle}>{title}</Text>
        <Button
            icon="plus"
            onPress={() => {
                ToastAndroid.show('Album added', ToastAndroid.SHORT);
                const dao = new DAO();
                dao.addDisc(
                    new Disc(
                        image || 'https://cdn-icons-png.flaticon.com/512/18/18471.png',
                        title,
                        artist,
                        genre,
                        tracks,
                        year,
                    ),
                );
            }}
            children="Add"
            style={[styles.addButton]}
        />
    </View>
);

export const Recherche = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  const [results, setResults] = useState({});

    const renderItem = ({ item }) => {
        console.log("Genre : " + item?.tags?.tag[0]?.name);
        return (
            <Item
                title={item.name}
                image={item?.image[1]?.['#text']}
                artist={item.artist.name}
                genre={item?.tags?.tag[0]?.name}
                year={""}
                tracks={item?.tracks?.track}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Album, artist, track..."
                onChangeText={onChangeSearch}
                value={searchQuery}
                icon={({ size, color }) => (
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/18/18471.png',
                        }}
                        style={{ width: size, height: size, tintColor: color }}
                    />
                )}
                onSubmitEditing={() => {
                    console.log('Search button on keyboard pressed');
                    myfetch(searchQuery).then(setResults);
                }}
            />
            <FlatList
                data={results?.topalbums?.album}
                renderItem={renderItem}
                keyExtractor={(item) => item?.image[0]?.['#text'] + item.name}
            />
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: 'white',
  },
});
