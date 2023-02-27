import React, {createContext, useState, useEffect} from 'react';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import {Platform, AppState} from 'react-native';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextValue = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextValue); //TODO que exporta el contexto

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      console.log({state});
      if (state !== 'active') {
        return;
      }

      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
