import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  bar: ViewStyle;
  unitsBar: ViewStyle;
  actionsBar: ViewStyle;
  specsBar: ViewStyle;
  specsRow: TextStyle;
  battleField: ViewStyle;
  battleFieldRow: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  battleField: {
    height: 500,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specsBar: {
    marginHorizontal: 50,
  },
  specsRow: {
    color: 'white',
  },
  battleFieldRow: {
    flexDirection: 'row',
  },
  actionsBar: {
    flexDirection: 'row',
    width: '100%',
  },
  unitsBar: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 80,
    width: '100%',
  },
});
