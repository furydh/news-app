import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { NewsCard } from '../components/NewsCard';
import { styles } from './App.styles';

const API_KEY = '9a9fad5053b046cd9f90776fcabd4381'; 

const CategoriesScreen = ({ route }) => {
  const { category } = route.params;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
        const newsURL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
        const response = await fetch(newsURL);
        const data = await response.json();
        setNews(data.articles);
        setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.toUpperCase()} NEWS</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsCard news={item} />}
      />
    </View>
  );
};


export default CategoriesScreen;
