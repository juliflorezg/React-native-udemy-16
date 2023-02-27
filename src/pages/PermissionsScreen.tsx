import React from 'react';
import {View, Text} from 'react-native';
export const PermissionsScreen = () => {
  // Los permisos no son 100% necesarios ya que si el usuario no concede permiso para el GPS, podemos obtener la localización usando la IP, pero esto crea un margen de error muy grande
  // https://www.npmjs.com/package/react-native-permissions

  return (
    <View>
      <Text>PermissionsScreen</Text>
    </View>
  );
};
