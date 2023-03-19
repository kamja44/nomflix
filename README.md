# react-router-dom

1. Routers 폴더 생성
2. Routers 폴더 안에 path로 사용할 파일 생성

- path="/" -> Home.tex
- path="tv" -> Tv.tsx
- path="/search" -> Search.tsx

3. 생성한 파일을 Component로 사용한다.

```js
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}
```

# header 생성

1. Components 폴더 생성(공통으로 사용될 코드 담는 폴더)
2. Compoenets 폴더 안에 Header.tsx파일 생성

- 공통을 사용될 header파일

Header는 2개의 column을 가진다.

## Netflix 로고 애니메이션

- framer-motion 이용

fill-opacity(fillOpacity)

- attribute의 opacity의 퍼센트를 의미한다.

animation을 단계적으로 실행시킬 수 있다.

```js
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
<Logo
  variants={logoVariants}
  initial="normal"
  whileHover="active"
  xmlns="http://www.w3.org/2000/svg"
  width="1024"
  height="276.742"
  viewBox="0 0 1024 276.742"
>
  <motion.path d="" />
</Logo>;
```

- 처음에는 0, 1, 0 순으로 애니메이션을 실행시킬 수 있다.
  - 즉, 배열로 단계만 지정해주면 motion(framer-motion)이 애니메이션을 단계적으로 실행한다.
- transition을 infinity로 지정함으로써 애니메이션을 무한히 반복한다

# header의 li 선택시 animation

## element를 정중앙에 배치시킬때의 CSS 코드

- 정중앙시킬 요소의 CSS를 left: 0, right: 0, margin: 0 auto로 설정한다.

```js
const Circle = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.theme.red};
  border-radius: 50%;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
```

## Link component

- react-router-dom

도메인이 같을 때(페이지의 이동이 없어야 할 때) <a>태그를 사용하면 안된다.

- <a> 태그 사용 시 페이지가 새로고침되며 새로운 페이지로 이동
- 즉, <Link> component를 이용한다.

Header.tsx

```js
<Items>
  <Item>
    <Link to="/">
      Home <Circle />
    </Link>
  </Item>
  <Item>
    <Link to="/tv">
      TV Shows <Circle />
    </Link>
  </Item>
</Items>
```

index.tsx

```js
<Router>
  <Header />
  <Switch>
    <Route path="/tv">
      <Tv />
    </Route>
    <Route path="/search">
      <Search />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
</Router>
```

- Router의 path="/"인 component가 가장 밑으로 가야 한다.
  - /, /tv, /search 순으로 있을 때 path가 /인 component가 무조건 참이기 때문

## route match

- react-router-dom
- useRouteMatch는 우리에게 이 route 안에 있는지 다른 곳에 있는지 알려준다.
- useRouteMath를 콘솔로 찍어보면 isExact, params, path, url이 나온다.
  - 이 중 isExact가 현재 url 상에 위치하는지 boolean 값으로 나타낸다.

```js
const homeMatch = useRouteMatch("/");
const tvMatch = useRouteMatch("/tv");
console.log(homeMatch, tvMatch);
return (
  <Nav>
    <Col>
      <Items>
        <Item>
          <Link to="/">
            Home {homeMatch?.isExact && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/tv">
            TV Shows {tvMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </Col>
  </Nav>
);
```

# search animation

```js
const [searchOpen, setSearchOpen] = useState(false);
const toggleSearch = () => setSearchOpen((prev) => !prev);
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
`;
<Search>
<motion.svg
onClick={toggleSearch}
animate={{ x: searchOpen ? -180 : 0 }}
transition={{ type: "linear" }}
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<Input
  placeholder="Search for movie or tv show..."
  transition={{ type: "linear" }}
  animate={{ scaleX: searchOpen ? 1 : 0 }}
/>
```

## transform-origin

- 변화가 시작하는 위치를 의미한다.
- transform-origin: right center;
  - 오른쪽에서부터 animation이 실행된다.

## search animation을 코드로부터 실행

- toggleSearch에서 animation 실행
- useAnimation hook 사용

# useAnimation

- 애니메이션들을 동시에 실행시키고 싶을 때 유용하다.

```js
const inputAnimation = useAnimation();
const toggleSearch = () => {
  if (searchOpen) {
    inputAnimation.start({
      scaleX: 0,
    });
  } else {
    inputAnimation.start({
      scaleX: 1,
    });
  }
  setSearchOpen((prev) => !prev);
};
return (
  <Input
    animate={inputAnimation}
    initial={{ scaleX: 0 }}
    placeholder="Search for movie or tv show..."
    transition={{ type: "linear" }}
  />
);
```

# useScroll

- scroll 감지 이벤트
- 스크롤을 움직일 때 제일 밑에서부터 얼마나 멀리 있는지를 알려준다.

```js
const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};
function(){
const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);
  <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
}
```
