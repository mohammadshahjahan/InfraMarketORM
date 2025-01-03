import {StyleSheet} from 'react-native';

export const CatalogStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    width: '100%',
  },
  headerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 3,
  },
  textInputContainer: {
    // make a multiple 4 value
    borderWidth: 1,
    marginLeft: 17,
    borderColor: '#C4C4C4',
    // make 100% then add margin
    width: '91%',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
