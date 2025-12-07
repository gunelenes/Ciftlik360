// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

type Screen = 'splash' | 'auth';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  if (currentScreen === 'splash') {
    return <SplashScreen onStart={() => setCurrentScreen('auth')} />;
  }

  if (currentScreen === 'auth') {
    return <AuthScreen />;
  }

  return null;
}

// Giriş Ekranı
interface SplashScreenProps {
  onStart: () => void;
}

function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2d5241" />
      <View style={styles.splashContainer}>
        {/* TEK GÖRSEL KULLANIMI - Tüm splash ekranı */}
        <Image
          source={require('./assets/splash-screen2.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
        
        {/* Butonları görselin üzerine yerleştiriyoruz */}
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={onStart}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>Hadi başlayalım..</Text>
          </TouchableOpacity>

          <View style={styles.accountInfo}>
            <Text style={styles.accountText}>Hesabınız yok mu? </Text>
            <TouchableOpacity onPress={onStart} activeOpacity={0.7}>
              <Text style={styles.registerText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Giriş/Üye Ol Ekranı
function AuthScreen() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2d5241" />
      <ScrollView contentContainerStyle={styles.authScrollContent}>
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>ÇİFTLİK 360</Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.activeTab]}
              onPress={() => setIsLogin(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.activeTab]}
              onPress={() => setIsLogin(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                Üye Ol
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta</Text>
              <View style={styles.input}>
                <Text style={styles.inputPlaceholder}>ornek@email.com</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.input}>
                <Text style={styles.inputPlaceholder}>••••••••</Text>
              </View>
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Şifre Tekrar</Text>
                <View style={styles.input}>
                  <Text style={styles.inputPlaceholder}>••••••••</Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.authButton} activeOpacity={0.8}>
              <Text style={styles.authButtonText}>
                {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sosyal Medya Girişleri */}
          <View style={styles.socialContainer}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>veya</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.socialButtonText}>🍎 Apple ile Devam Et</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.socialButtonText}>📱 Google ile Devam Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d5241',
  },
  splashContainer: {
    flex: 1,
    position: 'relative',
  },
  
  // TEK GÖRSEL KULLANIMINDA TÜM EKRANI KAPLAYAN GÖRSEL
  fullScreenImage: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Butonlar için overlay
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    // Eğer görselde buton yeri boşsa, arka plan eklemene gerek yok
    // Eğer görsel üzerinde yazı okunmuyorsa, hafif arka plan ekleyebilirsin:
    // backgroundColor: 'rgba(45, 82, 65, 0.3)',
  },

  startButton: {
    backgroundColor: '#e8dcc0',
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    width: '85%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#2d5241',
    fontSize: 19,
    fontWeight: '700',
  },
  accountInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  accountText: {
    color: '#e8dcc0',
    fontSize: 15,
  },
  registerText: {
    color: '#e8dcc0',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  // Auth Ekranı
  authScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  authTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#e8dcc0',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a3329',
    borderRadius: 14,
    padding: 5,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#e8dcc0',
  },
  tabText: {
    color: '#e8dcc0',
    fontSize: 16,
    fontWeight: '700',
  },
  activeTabText: {
    color: '#2d5241',
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 10,
  },
  inputLabel: {
    color: '#e8dcc0',
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e8dcc0',
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  inputPlaceholder: {
    color: '#999',
    fontSize: 15,
  },
  authButton: {
    backgroundColor: '#e8dcc0',
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  authButtonText: {
    color: '#2d5241',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#e8dcc0',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  // Sosyal Medya
  socialContainer: {
    marginTop: 30,
    gap: 15,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e8dcc0',
    opacity: 0.3,
  },
  dividerText: {
    color: '#e8dcc0',
    paddingHorizontal: 15,
    fontSize: 14,
    opacity: 0.7,
  },
  socialButton: {
    backgroundColor: '#1a3329',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8dcc0',
  },
  socialButtonText: {
    color: '#e8dcc0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});