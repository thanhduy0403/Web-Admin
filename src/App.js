import "./App.css";
import Router from "./router";

function App() {
  // useEffect(() => {
  //   const storedUser = Cookies.get("currentUser");
  //   if (storedUser) {
  //     dispatch(loginSuccess(JSON.parse(storedUser)));
  //   }
  // }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
