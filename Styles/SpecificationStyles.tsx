import {StyleSheet} from 'react-native';

export const SpecificationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  options: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    // paddingTop: 20,
  },
  label: {
    width: '20%',
    //paddingTop: 20,
  },
  option: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOption: {
    color: '#000',
  },
  activeOption: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderColor: '#F15927',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
