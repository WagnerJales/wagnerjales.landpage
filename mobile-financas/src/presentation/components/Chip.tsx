import React from 'react';
import { Text, View } from 'react-native';

export const Chip = ({ label, color }: { label: string; color: string }) => (
  <View style={{ backgroundColor: color, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 }}>
    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>{label}</Text>
  </View>
);
