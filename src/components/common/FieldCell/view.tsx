import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { styles } from './styles';

interface FieldCellProps {
  label?: string | null;
  defending?: boolean | null;
  paralyzed?: boolean | null;
  highlighted: boolean;
  x: number;
  y: number;
  onPress?: (x: number, y: number) => void;
  teamColor?: string;
  hp?: number | null;
  maxHp?: number | null;
}

export const FieldCell = ({
  label = '',
  highlighted,
  onPress,
  defending = false,
  x,
  y,
  teamColor = '#FFF',
  hp,
  maxHp,
  paralyzed = false,
}: FieldCellProps) => {
  const showHP = hp && maxHp;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress && highlighted && onPress(x, y);
      }}>
      <View
        style={[
          styles.container,
          highlighted ? styles.containerHighlighted : undefined,
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {defending && (
            <Image source={require('../../../assets/shield.png')} />
          )}
          {paralyzed && (
            <Image source={require('../../../assets/electricity.png')} />
          )}
        </View>
        {showHP ? (
          <Text
            style={{ fontSize: 10, color: teamColor }}>{`${hp}/${maxHp}`}</Text>
        ) : (
          undefined
        )}
        <Text style={[styles.label, { color: teamColor }]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
