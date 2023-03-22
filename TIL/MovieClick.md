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
