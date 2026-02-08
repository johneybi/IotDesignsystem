# Matter Device Data - Laundry Washer
# 이 파일은 AI가 읽어서 자동으로 UI를 생성하는 데 사용됩니다.

matter_device_data = {
    "nodeId": "0000000000000008",
    "vendorId": 4450,
    "productId": 5002,
    "deviceType": {
        "id": 115,
        "name": "LaundryWasher"
    },
    "deviceName": "드럼 세탁기",
    "location": "세탁실",
    "endpoints": [
        {
            "endpointId": 1,
            "clusters": [
                {
                    "clusterId": 6,
                    "clusterName": "OnOff",
                    "attributes": {
                        "onOff": True
                    },
                    "commands": ["On", "Off", "Toggle"]
                },
                {
                    "clusterId": 96,
                    "clusterName": "OperationalState",
                    "attributes": {
                        "operationalState": 0,  # 0=Stopped, 1=Running, 2=Paused, 3=Error
                        "operationalError": {
                            "errorStateID": 0,
                            "errorStateLabel": "No Error"
                        }
                    },
                    "commands": ["Start", "Stop", "Pause", "Resume"]
                },
                {
                    "clusterId": 83,
                    "clusterName": "LaundryWasherMode",
                    "attributes": {
                        "currentMode": 0,  # 0=Normal, 1=Delicate, 2=Heavy, 3=Whites
                        "supportedModes": [
                            {"label": "Normal", "mode": 0},
                            {"label": "Delicate", "mode": 1},
                            {"label": "Heavy Duty", "mode": 2},
                            {"label": "Whites", "mode": 3}
                        ]
                    },
                    "commands": ["ChangeToMode"]
                },
                {
                    "clusterId": 86,
                    "clusterName": "TemperatureControl",
                    "attributes": {
                        "temperatureSetpoint": 30,  # 냉수=20, 온수=40, 열수=60 (Celsius)
                        "minTemperature": 20,
                        "maxTemperature": 60,
                        "supportedTemperatures": [
                            {"label": "Cold", "value": 20},
                            {"label": "Warm", "value": 40},
                            {"label": "Hot", "value": 60}
                        ]
                    },
                    "commands": ["SetTemperature"]
                }
            ]
        }
    ],
    "isOnline": True
}

# 선택사항: 추가 메타데이터
device_metadata = {
    "manufacturer": "Flowthing",
    "model": "Washer Max",
    "capacity": "11kg",
    "firmwareVersion": "2.1.0",
    "lastUpdate": "2024-01-20"
}
