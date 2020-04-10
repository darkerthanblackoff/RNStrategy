import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface FieldCellStyle {
  container: ViewStyle;
  containerHighlighted: ViewStyle;
  label: TextStyle;
}

export const styles = StyleSheet.create<FieldCellStyle>({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 50,
    width: 50,
  },
  containerHighlighted: {
    backgroundColor: 'yellow',
  },
  label: {},
});
