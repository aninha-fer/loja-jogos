import { StyleSheet, Text, View } from 'react-native';

export default function categoriasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Categorias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
