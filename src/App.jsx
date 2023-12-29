import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import useauthStore from "./store/authStore";

function App() {
  // using the user state to authenticate the user and then navigate it to the next page after sucessfull authentication
  const authUser = useauthStore((state) => state.user);
  return (
    // Rapping all the pages in the page layout and this layout will be applied to all the pages.
    <PageLayout>
      <Routes>
        {/* if user is authenticated then go to the homepage else navigate to the auth page */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"./auth"} />}
        />
        {/* if user is not authenticate then go to the auth page else navigate to the home page */}
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
