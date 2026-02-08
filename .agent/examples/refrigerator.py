# Matter Device Data - Refrigerator
# 이 파일은 AI가 읽어서 자동으로 UI를 생성하는 데 사용됩니다.

matter_device_data = {
    "nodeId": "0000000000000009",
    "vendorId": 4450,
    "productId": 5003,
    "deviceType": {
        "id": 112,
        "name": "Refrigerator"
    },
    "deviceName": "양문형 냉장고",
    "location": "주방",
    "endpoints": [
        {
            "endpointId": 1,
            "deviceType": "RefrigeratorCompartment",
            "clusters": [
                {
                    "clusterId": 6,
                    "clusterName": "OnOff",
                    "attributes": {
                        "onOff": True
                    },
                    "commands": ["On", "Off"]
                },
                {
                    "clusterId": 86,
                    "clusterName": "TemperatureControl",
                    "attributes": {
                        "temperatureSetpoint": 3,  # 냉장실: -2°C ~ 8°C
                        "minTemperature": -2,
                        "maxTemperature": 8,
                        "temperatureMeasurement": 3  # 현재 온도
                    },
                    "commands": ["SetTemperature"]
                },
                {
                    "clusterId": 87,
                    "clusterName": "RefrigeratorAlarm",
                    "attributes": {
                        "doorOpen": False,  # True = 문 열림 경고
                        "temperatureAlarm": False
                    },
                    "commands": ["ResetAlarm"]
                }
            ]
        },
        {
            "endpointId": 2,
            "deviceType": "FreezerCompartment",
            "clusters": [
                {
                    "clusterId": 86,
                    "clusterName": "TemperatureControl",
                    "attributes": {
                        "temperatureSetpoint": -18,  # 냉동실: -24°C ~ -16°C
                        "minTemperature": -24,
                        "maxTemperature": -16,
                        "temperatureMeasurement": -18  # 현재 온도
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
    "model": "RefrigeratorPro",
    "capacity": "600L",
    "energyRating": "A++",
    "firmwareVersion": "3.0.1",
    "lastUpdate": "2024-02-01"
}
