import React from 'react';
import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';

export const PermissionsScreen = () => {
  // Los permisos no son 100% necesarios ya que si el usuario no concede permiso para el GPS, podemos obtener la localización usando la IP, pero esto crea un margen de error muy grande
  // https://www.npmjs.com/package/react-native-permissions

  //*   Permissions statuses
  // Permission checks and requests resolve into one of these statuses:

  // Return value	Notes
  // RESULTS.UNAVAILABLE	This feature is not available (on this device / in this context)
  // RESULTS.DENIED	The permission has not been requested / is denied but requestable
  // RESULTS.GRANTED	The permission is granted
  // RESULTS.LIMITED	The permission is granted but with limitations
  // RESULTS.BLOCKED	The permission is denied and not requestable anymore]

  //* type used in usage examples
  // type PermissionStatus =
  //   | 'unavailable'
  //   | 'denied'
  //   | 'limited'
  //   | 'granted'
  //   | 'blocked';

  check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(console.log);

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    console.log({permissionStatus});
  };

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>
      <Button title="GPS" onPress={checkLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
