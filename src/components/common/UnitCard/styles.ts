import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface UnitCardStyle {
  container: ViewStyle;
  label: TextStyle;
}

export const styles = StyleSheet.create<UnitCardStyle>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  label: {},
});
