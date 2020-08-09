/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';


import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';

import api from '../../services/api';
import styles from './styles';

const TeacherList: React.FC = () => {
  const weeksFormatted = [
    { numberDay: 0, nameDay: 'Domingo'},
    { numberDay: 1, nameDay: 'Segunda-feira'},
    { numberDay: 2, nameDay: 'Terça-feira'},
    { numberDay: 3, nameDay: 'Quarta-feira'},
    { numberDay: 4, nameDay: 'Quinta-feira'},
    { numberDay: 5, nameDay: 'Sexta-feira'},
    { numberDay: 6, nameDay: 'Sábado'},
  ];

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: TeacherProps) => teacher.id);

        setFavorites(favoritedTeachersIds);
      }
    });
  }, []);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  const handleFiltersSubmit = useCallback(async () => {
    loadFavorites();

    const result = weeksFormatted.find(week => week.nameDay === week_day);

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: result?.numberDay,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }, [subject, week_day, time, loadFavorites, weeksFormatted]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: TeacherProps) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
