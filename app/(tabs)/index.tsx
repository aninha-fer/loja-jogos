import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const categorias = ['Ação', 'RPG', 'Estratégia', 'Terror', 'Aventura', 'Simulação', 'Esportes', 'Corrida', 'Puzzle'];
  const jogo = {
    titulo: 'Minecraft',
    preco: 'R$ 199,90',
    avaliacao: '4.9',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }]} contentContainerStyle={{ paddingBottom: 100 }}> 
      <View style={styles.divEsquerda}>
        <Text style={styles.tituloCategoria}>Categorias</Text>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriaRow}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          directionalLockEnabled
          decelerationRate="fast"
          snapToInterval={110}
          snapToAlignment="start"
          renderItem={({ item }) => (
            <Pressable style={styles.categoria} onPress={() => { /* ação */ }}>
              <Text style={styles.categoriaText}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.divEsquerda}>
        <Text style={styles.titulo}>Mais Vendidos</Text>
        <Text style={styles.subtitulo}>Tendências globais hoje</Text>
      </View>
      <View style={styles.gridCards}>
        <View style={styles.card}>
          <View style={styles.imgCard}>
            <Image source={{ uri: jogo.imagem }} style={styles.imagem} contentFit="cover" />
          </View>
          <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPreco}>{jogo.preco}</Text>
            <Text style={styles.cardAvaliacao}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Path d="M1.9125 9.5L2.725 5.9875L0 3.625L3.6 3.3125L5 0L6.4 3.3125L10 3.625L7.275 5.9875L8.0875 9.5L5 7.6375L1.9125 9.5V9.5" fill="#A3C9FF"/>
              </Svg>{' '}
              {jogo.avaliacao}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.imgCard}>
            <Image source={{ uri: jogo.imagem }} style={styles.imagem} contentFit="cover" />
          </View>
          <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPreco}>{jogo.preco}</Text>
            <Text style={styles.cardAvaliacao}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Path d="M1.9125 9.5L2.725 5.9875L0 3.625L3.6 3.3125L5 0L6.4 3.3125L10 3.625L7.275 5.9875L8.0875 9.5L5 7.6375L1.9125 9.5V9.5" fill="#A3C9FF"/>
              </Svg>{' '}
              {jogo.avaliacao}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.imgCard}>
            <Image source={{ uri: jogo.imagem }} style={styles.imagem} contentFit="cover" />
          </View>
          <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPreco}>{jogo.preco}</Text>
            <Text style={styles.cardAvaliacao}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Path d="M1.9125 9.5L2.725 5.9875L0 3.625L3.6 3.3125L5 0L6.4 3.3125L10 3.625L7.275 5.9875L8.0875 9.5L5 7.6375L1.9125 9.5V9.5" fill="#A3C9FF"/>
              </Svg>{' '}
              {jogo.avaliacao}
            </Text>
          </View>
        </View>    
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divEsquerda: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  categoriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tituloCategoria: {
      fontSize: 20,
      color: '#A3C9FF',
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 0.6, 
  },
  categoria: {
    backgroundColor: '#272A31',
    height: 40,
    minWidth: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(64, 71, 83, 0.10)',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',  
    marginRight: 10,
  },
  categoriaText: {
    color: '#E1E2EB',
  },
  titulo: {
    color: '#E1E2EB',
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitulo: {
    color: '#E1E2EB',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  gridCards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    rowGap: 20,
  },
  card: {
    backgroundColor: '#191C22',
    height: 300,
    width: 165,
    borderRadius: 16,
    
  },
  imgCard: {
    // backgroundColor: 'red',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  cardTitulo: {
    color: '#E1E2EB',
    fontSize: 18,
    fontWeight: '700',
    margin: 10,
    textTransform: 'uppercase',
  },
  cardPreco: {
    color: '#A3C9FF',
    fontSize: 12,
    fontWeight: '700',
    margin: 10,
  },
  cardAvaliacao: {
    color: '#A3C9FF',
    fontSize: 10,
    fontWeight: '700',
    margin: 10,
  },
});