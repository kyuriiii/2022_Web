# Passport 처리 과정

## 로그인 과정
1. 로그인 요청이 들어온다.
2. passport.authenticate 메소드 호출
3. 로그인 전략 수행
4. 로그인 성공 시, 사용자 정보 객체와 함께 req.login호출
5. req.login 메소드가 passport.serializeUser의 콜백함수 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

## 로그인 이후 과정
1. 모든 요청에 대해 passport.deserializeUser 메소드 호출
2. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
3. 조회된 사용자 정보를 req.user에 저장
4. 라우터에서 req.user 객체 사용 가능

> spring에서 userId가 필요한 경우, session.getId()를 했던 걸 떠올리자.

