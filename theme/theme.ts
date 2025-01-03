import {StyleSheet} from 'react-native';

interface Colors {
  primary: string;
  secundary: string;
  complementary: string;
  background: string;
  cardColor: string;
  dangerColor: string;
}

export const colors: Colors = {
  primary: '#f5f6fa',
  secundary: '#0099FF',
  complementary: '#2c3e50',
  background: '#f5f6fa',
  cardColor: '#ecfdf5',
  dangerColor: '#dc2626',
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: colors.complementary,
    fontWeight: 'bold',
  },
  btnAccion: {
    width: 100,
    borderRadius: 5,
    color: colors.complementary,
    backgroundColor:colors.background
  },
  textBreadCrum:{
    fontSize:18,
    fontWeight:'500'
  }
});
