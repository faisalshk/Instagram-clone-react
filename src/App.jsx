import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  return (
    // Rapping all the pages in the page layout and the layout will be applied to all the pages.
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
