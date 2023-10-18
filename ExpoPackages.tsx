import React, {useEffect} from 'react';
import {View, ViewStyle} from 'react-native';

import * as Application from 'expo-application';
import * as Crypto from 'expo-crypto';
import {getLocales} from 'expo-localization';
import * as Font from 'expo-font';
import * as StatusBar from 'expo-status-bar';
import * as Network from 'expo-network';
import * as SecureStore from 'expo-secure-store';
import {Image, ImageStyle} from 'expo-image';
import * as Brightness from 'expo-brightness';
import * as Location from 'expo-location';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const ExpoPackages = () => {
  // 1. expo-application
  console.log({
    buildNumber: Application.nativeBuildVersion,
    versionNumber: Application.nativeApplicationVersion,
  });
  useEffect(() => {
    (async () => {
      // 2. expo-crypto
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        'GitHub stars are neat 🌟',
      );
      console.log('Digest: ', digest);
      // 6. expo-network
      const networkState = await Network.getNetworkStateAsync();
      console.log({networkState});
      // 9. expo-brightness -- warning started appearing here!
      const {status: brightnessStatus} =
        await Brightness.requestPermissionsAsync();
      console.log('------', {brightnessStatus});
      if (brightnessStatus === 'granted') {
        Brightness.setSystemBrightnessAsync(1);
      }
      // 10. expo-location
      let {status: locationStatus} =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        return;
      }
      const position = await Location.getCurrentPositionAsync();
      console.log({position});
    })();
  }, []);
  // 3. expo-localization
  console.log({locales: getLocales()});
  // 4. expo-font
  console.log({fonts: Font.isLoaded('MaterialIcons')});
  // 5. expo-status-bar
  StatusBar.setStatusBarHidden(true, 'none');
  // 7. expo-secure-store
  console.log({secureStore: SecureStore.isAvailableAsync()});
  // 8. expo-image
  return (
    <View style={$container}>
      <Image
        style={$image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  height: 250,
};

const $image: ImageStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: '#0553',
};
