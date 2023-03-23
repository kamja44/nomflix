# Box Click Event

Home.tsx

```js
history.push(`/movies/${movieId}`);
// onClick 이벤트 발생 시 push에 작성한 URL로 이동한다.
<Box
key={movie.id}
transition={{ type: "tween" }}
variants={BoxVariants}
whileHover="hover"
bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
onClick={() => onBoxClicked(movie.id)}
>
```

# UseHistory Hooks

- URL을 왔다갔다 할 수 있다.
  - 즉, 여러 route 사이를 왔다갔다 할 수 있다.

```js
const history = useHistory();
```

# useRouteMatch

- 지금 그 URL에 있는지 아닌지를 판단하는 도구이다.

match를 사용하기 전 App.tsx의 path를 배열로 변경한다.

App.tsx

```js
<Route path="/">
// 위의 코드를 아래와 같이 변경
<Route path={["/", "/movies/:movieId"]}>
// 즉, /movies/:movieId에 있을 때에도 Home을 render한다.
// react-router가 두 개의 path에서 같은 컴포넌트를 render하도록 할 수 있다.
```

Home.tsx

```js
const bigMovieMatch = useRouteMatch("/movies/:movieId");
// 현재 /movies/:movieId에 위치하는지 확인
```

# layoutId

- 서로 다른 component를 애니메이션으로 연결할 수 있다.

Home.tsx

```js
<Box
    key={movie.id}
    layoutId={movie.id+""}
    transition={{ type: "tween" }}
    variants={BoxVariants}
    whileHover="hover"
    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
    onClick={() => onBoxClicked(movie.id)}
>

<AnimatePresence>
{bigMovieMatch ? (
    <motion.div
    layoutId={bigMovieMatch.params.movieId}
    style={{
        position: "absolute",
        width: "40vw",
        height: "80vh",
        backgroundColor: "red",
        top: 10,
        left: 0,
        right: 50,
        margin: "0 auto",
    }}
    />
) : null}
</AnimatePresence>
```

# Overlay

- Overlay 클릭 시 원래의 URL로 돌아가기

Home.tsx

```js
const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const onOverlayClick = () => history.goBack();
<Overlay onClick={onOverlayClick} />;
```

# 스크롤을 해도 화면 가운데에 모달창 띄우기

- framer-motion의 useScroll 사용

```JS
const {scrollY} = useScroll();
<motion.div
    layoutId={bigMovieMatch.params.movieId}
    style={{
    position: "absolute",
    width: "40vw",
    height: "80vh",
    backgroundColor: "red",
    top: scrollY.get() + 100,
    left: 0,
    right: 50,
    margin: "0 auto",
    }}
/>
```

- 즉, 사용자의 위치를 감지해서 그 위치에 창을 띄운다.

- motion의 value를 사용하기 위해선 get()을 사용해야 한다.
