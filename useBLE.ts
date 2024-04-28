/*import { useMemo, useState } from "react";
import {PermissionsAndroid, Platform} from "react-native";
import {BleManager, Device } from "react-native-ble-plx"

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanforPeripherals(): void;
}

function useBLE(): BluetoothLowEnergyApi {
    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState <Device[]>([]);
    
    
}*/