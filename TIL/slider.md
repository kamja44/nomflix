# AnimatePresence

- component가 render되거나 destory될 때 효과를 지정한다.

Home.tsx

```js
import {AnimatePresence} form "framer-motion";
// Variants
const rowVariants = {
  hidden: {
    x: 1000,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -1000,
  },
};
function Home() {
  // index system
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex(prev => prev = 1);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
            <Row variants={rowVariants} initial="hidden" animate="visible" exit="exit" key={index} transition={{type: "tween", duration: 1}}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Box key={index}>{index}</Box>
                ))}
            </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
```

- index system이 필요한 이유
  - 어딘가를 클릭하면 계속 다음 페이지로 이동하는 기능을 만들기 위해
  - Banner 클릭 시 index 증가

# Row가 사라지기 전 Banner 클릭 시 Row가 바로 삭제되는 에러 해결

```js
const [index, setIndex] = useState(0);
const [leaving, setLeaving] = useState(false);
const increaseIndex = () => {
  if (leaving) return;
  setLeaving(true);
  setIndex((prev) => prev + 1);
};
```

# onExitComplete

- exit이 끝났을 때 함수를 실행한다.

# initial

- initial={false} <- 초기 상태의 initial animation을 사용하지 않는다.

```js
<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
```

# 배열 나누기

```js
const offset = 6; // offset 상수(한번에 보여주고 싶은 영화의 수)
// offset 상수는 페이지의 크기를 나타낸다.
let page = 0; // index

// 배열 나누기
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
); // 처음 6개 (1~6)까지 가져온다.

page = 1; // index
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
); // 그다음 6개 (7~12)까지 가져온다.

page = 2; // index
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
); // 그다음 6개 (13~18)까지 가져온다.
```

## 배열나누기 실전

```js
{
  data?.results
    .slice(1)
    .slice(offset * index, offset * index + offset)
    .map((movie) => <Box key={movie.id}>{movie.title}</Box>);
}
```

# Box에 이미지 삽입

Home.tsx

```js
const Box =
  styled(motion.div) <
  { bgPhoto: string } >
  `
// 괄호가 있을 때는 <Generic>을 괄호 뒤에 사용한다.
  background-color: white;
  height: 200px;
  color: red;
  font-size: 64px;
`;
const increaseIndex = () => {
  if (data) {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = data?.results.length;
    const maxIndex = Math.floor(totalMovies / offset) - 1; // page가 0에서 시작하기 때문
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }
};
{
  data?.results
    .slice(1)
    .slice(offset * index, offset * index + offset)
    .map((movie) => (
      <Box
        key={movie.id}
        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
      />
    ));
}
```
