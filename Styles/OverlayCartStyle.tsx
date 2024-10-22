import {StyleSheet} from 'react-native';

export const OverlayCartStyle = StyleSheet.create({
  container: {
    width: 350,
    borderRadius: 10,
    zIndex: 3,
    top: 50,
    right: 10,
    position: 'absolute',
    backgroundColor: '#fff',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    maxHeight: 500,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderColor: '#e3e3e3',
    borderBottomWidth: 1,
    maxHeight: 500,
  },
  headerText: {
    fontWeight: '600',
    color: '#000',
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  button: {
    width: '45%',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#f15927',
  },
});
