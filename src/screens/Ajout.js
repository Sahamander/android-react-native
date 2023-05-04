import { View, ToastAndroid } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { DAO } from '../services/DAO';
import { Disc } from '../models/Disc';

export const Ajout = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [tracks, setTracks] = useState('');

  return (
    <View>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        label="Artist"
        value={artist}
        onChangeText={(text) => setArtist(text)}
      />
      <TextInput
        label="Genre"
        value={genre}
        onChangeText={(text) => setGenre(text)}
      />
      <TextInput
        label="Year"
        value={year}
        onChangeText={(text) => setYear(text)}
      />
      <TextInput
        label="Image URL"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        label="Track 1"
        value={tracks}
        onChangeText={(text) => setTracks(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          const dao = new DAO();
          dao.addDisc(new Disc(image, title, artist, genre, tracks, year));
          ToastAndroid.show('Disc added', ToastAndroid.SHORT);
        }}
      >
        Save
      </Button>
    </View>
  );
};
