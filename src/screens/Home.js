import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { DAO } from '../services/DAO';

export const Home = ({ refresh }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const dao = new DAO();
    dao.getDiscs().then((data) => setAlbums(data));
  }, [refresh]);

  const renderItem = ({ item }) => {
    console.log(item.image);
    return (
      <View style={styles.album}>
        <Image
          source={{
            uri:
              item.image ||
              'https://cdn-icons-png.flaticon.com/512/18/18471.png',
          }}
          style={styles.albumImage}
        />
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle}>{item.title}</Text>
          <Text style={styles.albumGenre}>{item.genre}</Text>
          <Text style={styles.albumArtist}>{item.artist}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albums</Text>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          const dao = new DAO();
          //   dao.flush().then(() => setAlbums([]));
          dao.flush();
        }}
        children="Flush"
      />
      <FlatList
        data={albums}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.albumList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  albumList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  album: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
  },
  albumImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  albumDetails: {
    flex: 1,
  },
  albumTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  albumInfo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  albumGenre: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  albumArtist: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  }
});
