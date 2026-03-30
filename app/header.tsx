import { StyleSheet, Text, View } from 'react-native';

export default function FixedHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>NEXUS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#040B28',
    paddingLeft: 20,
    paddingTop: 30
  },
  headerText: {
    color: '#A3C9FF',
    fontSize: 22,
    fontWeight: '700',
  },
});
