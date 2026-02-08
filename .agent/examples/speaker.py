# Matter Device Data - Smart Speaker
# 이 파일은 AI가 읽어서 자동으로 UI를 생성하는 데 사용됩니다.

matter_device_data = {
    "nodeId": "0000000000000007",
    "vendorId": 4450,
    "productId": 5001,
    "deviceType": {
        "id": 45,
        "name": "Speaker"
    },
    "deviceName": "거실 스피커",
    "location": "거실",
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
                    "clusterId": 8,
                    "clusterName": "LevelControl",
                    "attributes": {
                        "currentLevel": 127,  # 0-254 범위
                        "minLevel": 0,
                        "maxLevel": 254
                    },
                    "commands": ["MoveToLevel", "Move", "Step", "Stop"]
                },
                {
                    "clusterId": 1286,
                    "clusterName": "MediaPlayback",
                    "attributes": {
                        "currentState": 0,  # 0=Playing, 1=Paused, 2=NotPlaying
                        "startTime": 0,
                        "duration": 0,
                        "sampledPosition": {
                            "position": 120000,  # milliseconds
                            "updatedAt": 1640000000
                        }
                    },
                    "commands": ["Play", "Pause", "Stop", "Next", "Previous"]
                }
            ]
        }
    ],
    "isOnline": True
}

# 선택사항: 추가 메타데이터
device_metadata = {
    "manufacturer": "Flowthing",
    "model": "Speaker Pro",
    "firmwareVersion": "1.2.3",
    "lastUpdate": "2024-01-15"
}
