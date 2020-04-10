import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface UnitCardProps {
  label: string;
  color: string;
  highlighted?: boolean;
}

export const UnitCard = ({ label, color, highlighted }: UnitCardProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: highlighted ? 'yellow' : color },
      ]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
