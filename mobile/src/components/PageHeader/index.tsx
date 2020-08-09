import React, { useCallback } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import backIcon from '../../assets/icons/back.png';
import logoImg from '../../assets/logo.png';

import styles from './styles';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.navigate('Landing');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default PageHeader;
