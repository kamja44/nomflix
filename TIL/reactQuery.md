# 리엑트 쿼리를 이용하여 데이터 가져오기

1. 쿼리 클라이언트 생성

- index.tsx에서 쿼리 클라이언트 생성

```js
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
```

2. api.ts 파일에서 API 요청

```js
const API_KEY = "17cd240cd563008f446fafd5726a0ebb";
const BASE_PATH = "https://api.themoviedb.org/";
const NOW_PLAYING = "/movie/now_playing";
export function getMovies() {
  return fetch(
    `${BASE_PATH}${NOW_PLAYING}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
```

3. Home.tsx(API를 사용할 곳)에서 reactQuery사용

```js
import { useQuery } from "react-query";
import { getMovies } from "../api";
const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
// ["movies","nowPlaying"]은 식별자에 불과하다.
// reactQuery는 data와 로딩중 여부를 반환한다.
```

## 리엑트 쿼리를 이용하여 이미지 가져오기
