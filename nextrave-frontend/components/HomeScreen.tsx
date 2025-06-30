import React from 'react';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/Feather';

type HomeScreenProps = {
  onNavigate: (route: string) => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => (
  <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
    <MaskedView
        style={{ marginBottom: 10 }}
        maskElement={
            <Text
            style={{
                fontSize: 36,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'black',
                paddingBottom: 8,
            }}
            >
            NextRave
            </Text>
        }
        >
        <LinearGradient
            colors={['#A855F7', '#EC4899', '#EF4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 44 }}
        />
    </MaskedView>

    <View style={styles.buttonGroup}>
      <TouchableOpacity onPress={() => onNavigate('create-room')} style={styles.primaryButton}>
        <LinearGradient
          colors={['#EF4444', '#EC4899']} // orange gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingVertical: 20, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}
        >
          <Text style={styles.primaryButtonText}>Create Room</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('join-room')} style={styles.primaryButton}>
        <LinearGradient
          colors={['#A78BFA', '#8B5CF6']} // soft purple gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingVertical: 20, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}
        >
          <Text style={styles.primaryButtonText}>Join Room</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>

    <View style={styles.howItWorksContainer}>
      <View style={styles.howItWorksHeader}>
        <Icon name="music" size={20} color="#A855F7" />
        <Text style={styles.howItWorksTitle}>How it works</Text>
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.step}>
          <View style={[styles.stepNumber, { backgroundColor: '#8B5CF6' }]}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>Create or join a party room</Text>
        </View>
        <View style={styles.step}>
          <View style={[styles.stepNumber, { backgroundColor: '#EC4899' }]}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>Suggest songs and vote on favorites</Text>
        </View>
        <View style={styles.step}>
          <View style={[styles.stepNumber, { backgroundColor: '#A855F7' }]}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>Let democracy decide the vibe</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: '#18181B', padding: 24 },
    homeHeader: { alignItems: 'center', marginBottom: 32 },
    titleGradient: { padding: 8, borderRadius: 12 },
    appSubtitle: { color: '#C4B5FD', fontSize: 16, marginTop: 8, textAlign: 'center' },
    buttonGroup: { marginBottom: 32 },
    primaryButton: {marginBottom: 12, borderRadius: 24, overflow: 'hidden',elevation: 8,shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 8,},
    primaryButtonText: { color: 'white',fontWeight: '700',fontSize: 18,textAlign: 'center',letterSpacing: 0.5,},
    secondaryButton: { backgroundColor: '#27272A', borderRadius: 16, padding: 16 },
    secondaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
    howItWorksContainer: { backgroundColor: '#27272A', borderRadius: 20, padding: 24 },
    howItWorksHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    howItWorksTitle: { color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 8 },
    stepContainer: { marginTop: 8 },
    step: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    stepNumber: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    stepNumberText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    stepText: { color: '#C4B5FD', fontSize: 15 },
    });

export default HomeScreen;