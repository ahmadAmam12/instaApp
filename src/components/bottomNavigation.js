import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//import assets icons
import Home from '../assets/images/home.svg';
import HomeActive from '../assets/images/homeActive.svg';
import Add from '../assets/images/add.svg';
import AddActive from '../assets/images/addActive.svg';
import Profile from '../assets/images/profile.svg';
import ProfileActive from '../assets/images/profileActive.svg';

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const IconTab = () => {
          if (label === 'Home') {
            return isFocused ? <HomeActive /> : <Home />;
          }
          if (label === 'Post') {
            return isFocused ? <AddActive /> : <Add />;
          }
          if (label === 'Profile') {
            return isFocused ? <ProfileActive /> : <Profile />;
          }
          return <Home />;
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.iconTab}>
            <IconTab />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 13,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 50,
  },
  iconTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
