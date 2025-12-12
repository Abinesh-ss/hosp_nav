import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function ScanQRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    try {
      const qrData = JSON.parse(data);
      navigation.navigate('Navigation', {
        startPosition: qrData,
        hospitalId: qrData.hospitalId
      });
    } catch (e) {
      alert('Invalid QR code');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan the entrance QR code</Text>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          onBarCodeScanned={handleBarCodeScanned}
        />
      </View>
      <Button 
        title="Use Demo Position" 
        onPress={() => navigation.navigate('Navigation', {
          startPosition: { x: 0, y: 0, floor: 1, nodeId: 'entrance' },
          hospitalId: 'demo'
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cameraContainer: { height: 400, marginBottom: 20 },
  camera: { flex: 1 }
});
