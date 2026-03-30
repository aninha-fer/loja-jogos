import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const categorias = ['Ação', 'RPG', 'Estratégia', 'Terror', 'Aventura', 'Simulação', 'Esportes', 'Corrida', 'Puzzle'];
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }]}> 
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
    </View>
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
    paddingBottom: 16,
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
  }
});