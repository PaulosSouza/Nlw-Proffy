import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/landing.png';
import studyIcon from '../../assets/icons/study.png';
import giveClassesIcon from '../../assets/icons/give-classes.png';
import hearIcon from '../../assets/icons/heart.png';

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigation.navigate('GiveClasses');
  }, [navigation]);

  const handleNavigateToStudyPages = useCallback(() => {
    navigation.navigate('Study');
  }, [navigation]);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem vindo,
        {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}> Estudar </Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}> Dar aulas </Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas
        {'  '}
        <Image source={hearIcon} />
      </Text>
    </View>
  );
};

export default Landing;
