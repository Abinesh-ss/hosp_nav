import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startSensorTracking, qrCodeCorrection } from '../lib/sensors/deadReckoning';

export default function NavigationScreen({ route }) {
  const { startPosition, hospitalId } = route.params;
  const [position, setPosition] = useState(startPosition);
  const [path, setPath] = useState([]);

  useEffect(() => {
    qrCodeCorrection(startPosition.x, startPosition.y, startPosition.floor);
    
    const cleanup = startSensorTracking((newPosition) => {
      setPosition(newPosition);
    });

    return cleanup;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HospiNav - Real-Time Navigation</Text>
      
      <View style={styles.mapArea}>
        <View style={styles.dot} />
        <Text style={styles.label}>You Are Here</Text>
        <Text style={styles.coords}>
          X: {position.x.toFixed(2)}m, Y: {position.y.toFixed(2)}m
        </Text>
        <Text style={styles.coords}>Floor: {position.floor}</Text>
        <Text style={styles.coords}>Heading: {position.heading?.toFixed(0)}°</Text>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          📍 Walk straight ahead for 15 meters
        </Text>
        <Text style={styles.instructionText}>
          ➡️ Turn right at the pharmacy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  mapArea: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    padding: 20
  },
  dot: { 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    backgroundColor: '#3b82f6',
    marginBottom: 10
  },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  coords: { fontSize: 14, color: '#666', marginBottom: 5 },
  instructions: { 
    marginTop: 20, 
    padding: 15, 
    backgroundColor: '#e6ffe6',
    borderRadius: 10
  },
  instructionText: { 
    fontSize: 16, 
    marginBottom: 10 
  }
});
