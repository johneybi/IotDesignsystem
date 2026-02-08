# Localization & String Handling

텍스트 표시 규칙과 다국어 처리 가이드입니다.

## Device Status Text

### 한국어 (기본)

```yaml
온/오프: "켜짐" / "꺼짐"
연결: "연결됨" / "연결 끊김"
모드: "냉방" / "난방" / "자동"
팬 속도: "약풍" / "중풍" / "강풍"
상태: "활성" / "비활성"
```

### 영어 (fallback)

```yaml
On/Off: "On" / "Off"
Connection: "Connected" / "Disconnected"
Mode: "Cool" / "Heat" / "Auto"
Fan Speed: "Low" / "Medium" / "High"
Status: "Active" / "Inactive"
```

---

## Unit Display

### 온도

```javascript
// ✅ 올바른 표시
`${temp}°C``${temp}°F`
// ❌ 잘못된 표시
`${temp} C``${temp}℃` // ℃ 대신 °C 사용
`${temp} degrees`;
```

**이유:** `°C`가 국제 표준 (SI), `℃`는 레거시 문자

---

### 백분율

```javascript
// ✅ 올바른 표시
`${brightness}%``밝기 ${brightness}%`
// ❌ 잘못된 표시
`${brightness} 퍼센트``${brightness} percent`;
```

---

### 시간

```javascript
// ✅ 올바른 표시
`${hours}시간 ${minutes}분`
`${hours}h ${minutes}m` (영어)

// ❌ 잘못된 표시
`${hours}:${minutes}` (시계 시간과 혼동)
```

---

## Error Messages

### 사용자 친화적 메시지

```yaml
❌ 기술적 메시지:
  - "ClusterID 6 not found"
  - "Value 300 exceeds max 254"
  - "Connection timeout after 5000ms"

✅ 사용자 친화적 메시지:
  - "기기 제어 기능을 찾을 수 없습니다"
  - "설정 값이 허용 범위를 초과했습니다"
  - "기기와 연결할 수 없습니다"
```

### 에러 메시지 매핑

```javascript
const ERROR_MESSAGES = {
  CLUSTER_NOT_FOUND: "기기 제어 기능을 찾을 수 없습니다",
  VALUE_OUT_OF_RANGE: "설정 값이 허용 범위를 초과했습니다",
  CONNECTION_TIMEOUT: "기기와 연결할 수 없습니다",
  DEVICE_OFFLINE: "기기가 오프라인 상태입니다",
  INVALID_COMMAND: "지원하지 않는 명령입니다",
};
```

---

## Number Formatting

### 정수형

```javascript
// 온도 (소수점 없음)
const temp = 24;
`${temp}°C`;

// 백분율
const brightness = 75;
`${brightness}%`;
```

### 소수형

```javascript
// 온도 (0.5°C 단위)
const temp = 24.5;
`${temp.toFixed(1)}°C`;

// 습도 (정수 추천)
const humidity = 45;
`${humidity}%`;
```

---

## Date & Time

### 상대 시간

```javascript
function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) return "방금 전";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
  return `${Math.floor(diff / 86400000)}일 전`;
}
```

### 절대 시간

```javascript
// 한국어
const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
// "2026년 2월 9일 오후 12:30"

// 영어
const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
// "Feb 9, 12:30 PM"
```

---

## String Truncation

### 긴 디바이스 이름

```javascript
function truncateDeviceName(name, maxLength = 20) {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength - 3)}...`;
}

// "거실 스마트 LED 조명 프리미엄" → "거실 스마트 LED 조명..."
```

---

## Pluralization (영어)

```javascript
function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

`${deviceCount} ${pluralize(deviceCount, "device", "devices")}`;
// "1 device" or "3 devices"
```

**한국어는 복수형 없음:**

```javascript
`${deviceCount}개의 기기`;
// "1개의 기기" or "3개의 기기"
```

---

## Accessibility Labels (ARIA)

### 한국어

```jsx
<Button aria-label="거실 조명 켜기" />
<Slider
  aria-label="밝기 조절"
  aria-valuenow={75}
  aria-valuetext="75 퍼센트"
/>
```

### 영어

```jsx
<Button aria-label="Turn on living room light" />
<Slider
  aria-label="Adjust brightness"
  aria-valuenow={75}
  aria-valuetext="75 percent"
/>
```

---

## Special Characters

### 금지 문자

```yaml
❌ 사용 금지:
  - Smart quotes: " " ' ' (곧은 따옴표 " ' 사용)
  - 전각 공백: 　 (반각 공백 사용)
  - 레거시 문자: ℃ ℉ (°C °F 사용)
```

### 이모지 사용

```yaml
✅ 허용 (상태 표시):
  - ⚠️ 경고
  - ✅ 성공
  - ❌ 오류
  - 🔄 로딩

❌ 지양 (장식용):
  - 🏠 집 (불필요)
  - 💡 전구 (아이콘 사용 권장)
```

---

## 체크리스트

문자열 처리 시 확인:

- [ ] 온도: `°C` 형식 사용
- [ ] 백분율: `%` 형식 사용
- [ ] 에러 메시지: 사용자 친화적 표현
- [ ] 숫자: 적절한 소수점 자릿수
- [ ] 날짜/시간: Intl API 사용
- [ ] 긴 텍스트: 말줄임표 처리
- [ ] ARIA 라벨: 명확한 설명
- [ ] 특수 문자: 표준 문자 사용
