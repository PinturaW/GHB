import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function SelfBusinessScreen() {
  const [productPhoto, setProductPhoto] = useState(null);
  const [storefrontPhoto, setStorefrontPhoto] = useState(null);
  const [invoicePhoto, setInvoicePhoto] = useState(null);
  const [desc, setDesc] = useState('');

  const pickImage = async (setter) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const onVerify = () => {
    if (!productPhoto || !storefrontPhoto || !invoicePhoto || !desc) {
      Alert.alert('กรุณาอัปโหลดไฟล์และกรอกข้อมูลให้ครบถ้วน');
      return;
    }
    Alert.alert('ส่งข้อมูลสำเร็จ', 'ระบบได้รับข้อมูลยืนยันธุรกิจของคุณแล้ว');
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>Self-Business Verification</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photo of product or service*</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage(setProductPhoto)}>
          <Text style={styles.uploadBtnText}>Upload Photo</Text>
        </TouchableOpacity>
        {productPhoto && <Image source={{ uri: productPhoto }} style={styles.preview} />}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photo of storefront*</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage(setStorefrontPhoto)}>
          <Text style={styles.uploadBtnText}>Upload Photo</Text>
        </TouchableOpacity>
        {storefrontPhoto && <Image source={{ uri: storefrontPhoto }} style={styles.preview} />}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice / Order screenshot*</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage(setInvoicePhoto)}>
          <Text style={styles.uploadBtnText}>Upload File</Text>
        </TouchableOpacity>
        {invoicePhoto && <Image source={{ uri: invoicePhoto }} style={styles.preview} />}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe your business</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your business"
          value={desc}
          onChangeText={setDesc}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={onVerify}>
        <Text style={styles.verifyBtnText}>Verify My Business</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF4F0' 
  },
  contentContainer: { 
    padding: 24,
    paddingBottom: 40
  },
  header: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#f60', 
    marginBottom: 24,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8
  },
  uploadBtn: {
    backgroundColor: '#f60',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    backgroundColor: '#fff',
    fontSize: 16,
    minHeight: 100
  },
  preview: { 
    width: 120, 
    height: 120, 
    marginTop: 8, 
    borderRadius: 8,
    alignSelf: 'center'
  },
  verifyBtn: {
    backgroundColor: '#f60',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  verifyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});