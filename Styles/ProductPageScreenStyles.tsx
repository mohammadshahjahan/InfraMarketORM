import {StyleSheet} from 'react-native';

export const ProductScreenPageStyles = StyleSheet.create({
  ratingContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#f15927',
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
