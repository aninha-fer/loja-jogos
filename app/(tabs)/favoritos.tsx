import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

export default function FavoritosScreen() {
  const colorScheme = useColorScheme();
  const [favoritos, setFavoritos] = useState([
    {
      id: '1',
      titulo: 'Minecraft',
      categorias: ['RPG DE AÇÃO'],
      info: '',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
      favoritado: true,
    },
    {
      id: '2',
      titulo: 'Minecraft',
      categorias: ['SIMULAÇÃO', 'ESPACIAL'],
      info: '',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
      favoritado: true,
    },
    {
      id: '3',
      titulo: 'Minecraft',
      categorias: ['FANTASIA DARK'],
      info: '',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
      favoritado: true,
    },
    {
      id: '4',
      titulo: 'Minecraft',
      categorias: ['CORRIDA ARCADE'],
      info: '',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
      favoritado: true,
    },
    {
      id: '5',
      titulo: 'Minecraft',
      categorias: ['INDIE ADVENTURE'],
      info: '',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
      favoritado: true,
    },
  ]);

  function toggleFavorito(id: string) {
    setFavoritos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favoritado: !item.favoritado } : item
      )
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Meus Favoritos</Text>
        <Text style={styles.subtitulo}>{favoritos.length} JOGOS SALVOS</Text>
      </View>

      <View style={styles.lista}>
        {favoritos.map((jogo) => (
          <View key={jogo.id} style={styles.card}>
            <View style={styles.imgCard}>
              <Image source={{ uri: jogo.imagem }} style={styles.imagem} contentFit="cover" />
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
              <View style={styles.categoriasRow}>
                {jogo.categorias.map((cat, index) => (
                  <Text key={index} style={styles.categoriaText}>{cat}</Text>
                ))}
                <Text style={styles.dot}>·</Text>
                <Text style={styles.infoText}>{jogo.info}</Text>
              </View>
            </View>

            <Pressable style={styles.heartButton} onPress={() => toggleFavorito(jogo.id)}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill={jogo.favoritado ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
                <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </Svg>
            </Pressable>

            <Pressable style={styles.jogarButton} onPress={() => { /* ação jogar */ }}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Polygon points="2,1 9,5 2,9" fill="#0A0D13" />
              </Svg>
              <Text style={styles.jogarText}>JOGAR</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    marginBottom: 10,
  },
  titulo: {
    color: '#E1E2EB',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitulo: {
    color: '#A3C9FF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
    gap: 12,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#191C22',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  imgCard: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  cardTitulo: {
    color: '#E1E2EB',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  categoriaText: {
    color: '#A3C9FF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  dot: {
    color: '#A3C9FF',
    fontSize: 9,
  },
  infoText: {
    color: '#6B7280',
    fontSize: 9,
    letterSpacing: 0.4,
  },
  heartButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jogarButton: {
    backgroundColor: '#A3C9FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jogarText: {
    color: '#0A0D13',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
