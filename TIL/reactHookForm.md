# 검색 이벤트 제어

Header.js

```js
interface IForm {
  keyword: string;
}
const history = useHistory();
const { register, handleSubmit } = useForm<IForm>();
const onValid = (data: IForm) => {
history.push(`/search?keyword=${data.keyword}`);
};
<Search onSubmit={handleSubmit(onValid)}>
// form 제출 시 history.push에 의해 /search?keyword=${data.keyword} URL로 이동한다.
<Input
  {...register("keyword", {required: true, minLength: 2})}
  animate={inputAnimation}
  initial={{ scaleX: 0 }}
  placeholder="Search for movie or tv show..."
  transition={{ type: "linear" }}
/>;
```

# useLocation

location을 이용하면 지금 잇는 곳에 관한 정보를 얻을 수 있다.

Search.tsx

```js
const location = useLocation();
const keyword = new URLSearchParams(location.search).get("keyword");
console.log(keyword);
console.log(location);
```

# URLSearchParameter

- js에 내장된 도구이다.
- URL 파싱을 도와준다.
