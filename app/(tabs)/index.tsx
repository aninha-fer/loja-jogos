import Card from '@/components/card';
import CarrosselCategorias from '@/components/carrossel-categorias';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import axios from 'axios';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

type Jogo = {
  titulo: string;
  descricao: string;
  preco: number;
  genero: string;
  dataLancamento: string;
  tamanho: number;
  capa: string;
  idadeMinima: number;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<Jogo[]>([]);

  const categorias = ['acao', 'RPG', 'sobrevivencia', 'aventura', 'esporte'];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://projeto-steam.vercel.app/jogos');
        setData(response.data); 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const jogo = {
    titulo: 'Minecraft',
    preco: 'R$ 199,90',
    avaliacao: '4.9',
    descricao: 'Minecraft é um jogo de construção e aventura onde os jogadores podem explorar um mundo, coletar recursos, construir estruturas e enfrentar criaturas.',
    capa: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s',
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }]} contentContainerStyle={{ paddingBottom: 100 }}> 
      <View style={styles.destaqueSemana}>
        <Image source={{ uri: jogo.capa }} style={styles.destaqueImagem} contentFit="cover" />
        <View style={styles.destaqueOverlay} />
        <View style={styles.destaqueContent}>
          <Text style={styles.tituloDestaque}>Destaque da Semana</Text>
          <Text style={styles.titulo}>{jogo.titulo}</Text>
          <Text style={styles.descricao}>{jogo.descricao}</Text>
          <Pressable style={styles.jogarButton} onPress={() => { Alert.alert('Download', 'Iniciando download...') }}>
            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <Polygon points="2,1 9,5 2,9" fill="#002A51" />
            </Svg>
            <Text style={styles.jogarText}>JOGAR</Text>
          </Pressable>
        </View>
      </View>
      <CarrosselCategorias categorias={categorias} selecionavel={false}/>
      <View style={styles.divEsquerda}>
        <Text style={styles.titulo}>Mais Vendidos</Text>
        <Text style={styles.subtitulo}>Tendências globais hoje</Text>
      </View>
      <View style={styles.gridCards}>
        {data.map((jogo, index) => (
          <Card key={index} jogo={jogo} />
        ))}
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
  destaqueSemana: {
    height: 400,
    borderRadius: 16,
    margin: 20,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#020617',
  },
  destaqueImagem: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  destaqueOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  destaqueContent: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    gap: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  descricao: {
    color: '#E1E2EB',
    fontSize: 12,
    letterSpacing: 1.2,
    marginTop: 12,
  },
  jogarButton: {
    backgroundColor: '#A3C9FF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 110,
  },
  jogarText: {
    color: '#002A51',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  tituloDestaque: {
    backgroundColor: 'rgba(163, 201, 255, 0.15)',
    width: 200,
    paddingHorizontal: 5,
    paddingVertical: 4,
    fontSize: 10,
    borderRadius: 50,
    textTransform: 'uppercase',
    color: '#A3C9FF',
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(163, 201, 255, 0.3)',
  }
});