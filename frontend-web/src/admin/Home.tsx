const handleGoogleLogin = () => {
  // TODO: 실제 Google 로그인 연동
  alert('Google 로그인');
};

const handleKakaoLogin = () => {
  // TODO: 실제 Kakao 로그인 연동
  alert('Kakao 로그인');
};

const Home = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-textColor">관리자 소셜 로그인</h1>
        <p className="mb-8 text-softBlue text-center">소셜 계정으로 간편하게 로그인하세요.</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full mb-4 py-2 rounded bg-white border border-mediumLightGray text-textColor font-semibold shadow hover:bg-mediumLightGray transition"
        >
          <span className="mr-2"></span> Google로 로그인
        </button>
        <button
          onClick={handleKakaoLogin}
          className="w-full mb-4 py-2 rounded bg-white border border-mediumLightGray text-textColor font-semibold shadow hover:bg-mediumLightGray transition"
        >
          <span className="mr-2"></span> Kakao로 로그인
        </button>
      </div>
    </div>
  );
};

export default Home;
