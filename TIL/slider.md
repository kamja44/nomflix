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
