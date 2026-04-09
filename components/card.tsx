import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Card({ jogo }: { jogo: any }) {
    const [favoritado, setFavoritado] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verificarFavorito = async () => {
            try {
                const response = await fetch('https://projeto-steam.vercel.app/favoritos');
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                const favoritos = await response.json();
                console.log('Favoritos recebidos:', favoritos);
                console.log('Título do jogo:', jogo.titulo);
                const isFavoritado = favoritos[jogo.titulo] && Array.isArray(favoritos[jogo.titulo]) && favoritos[jogo.titulo].length > 0;
                console.log('isFavoritado:', isFavoritado);
                setFavoritado(isFavoritado);
            } catch (error) {
                console.error('Erro ao verificar favorito:', error);
                setFavoritado(false);
            }
        };
        verificarFavorito();
    }, [jogo.titulo]);

    const toggleFavorito = async () => {
        console.log('Toggle chamado para:', jogo.titulo, 'favoritado:', favoritado);
        if (!favoritado) {
            try {
                const response = await fetch('https://projeto-steam.vercel.app/adicionar-favorito', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: jogo.titulo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                setFavoritado(true);
                console.log('Adicionado:', json);
            } catch (error) {
                Alert.alert('Erro', error.message);
            }
        } else {
            try {
                const response = await fetch('https://projeto-steam.vercel.app/remover-favorito', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: jogo.titulo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                setFavoritado(false);
                console.log('Removido:', json);
            } catch (error) {
                Alert.alert('Erro', error.message);
            }
        }
    };
    function abrirJogo() {
        router.push({
            pathname: '/tela-jogo',
            params: {
                titulo: jogo.titulo,
                imagem: jogo.capa,
                info: jogo.descricao,
                categorias: jogo.categorias?.join('|') || '',
            },
        } as any);
    }

    return (
        <Pressable onPress={abrirJogo}>
            <View style={styles.card}>
                <View style={styles.imgCard}>
                    <Pressable style={styles.heartButton} onPress={() => { toggleFavorito() }}>
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill={favoritado ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
                        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </Svg>
                    </Pressable>
                    <Image source={{ uri: jogo.capa }} style={styles.imagem} contentFit="cover" />
                </View>
                <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.cardPreco}>R$ {jogo.preco}</Text>
                    <Text style={styles.cardAvaliacao}>
                        <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <Path d="M1.9125 9.5L2.725 5.9875L0 3.625L3.6 3.3125L5 0L6.4 3.3125L10 3.625L7.275 5.9875L8.0875 9.5L5 7.6375L1.9125 9.5V9.5" fill="#ffffff"/>
                        </Svg>{' '}
                        {jogo.avaliacao}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C22',
    height: 300,
    width: 165,
    borderRadius: 16,
    
  },
  imgCard: {
    position: 'relative',
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
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
});