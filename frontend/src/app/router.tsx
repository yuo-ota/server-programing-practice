import { Route, Routes } from 'react-router';
import RequireAuth from './auth/RequireAuth';
import RequireAdminAuth from './auth/RequireAdminAuth';
import { Root } from './routes/Root';
import { Login } from './routes/Login';
import { Login as AdminLogin } from './routes/admin/Login';
import { Root as PasswordResetRoot } from './routes/password-reset/Root';
import { Root as SignupRoot } from './routes/signup/Root';
import { Verify as PasswordResetVerify } from './routes/password-reset/Verify';
import { Verify as SignupVerify } from './routes/signup/Verify';
import { Setting as SignupSetting } from './routes/signup/Setting';
import { Notifications as HomeNotifications } from './routes/home/Notifications';
import { Root as HomePostsRoot } from './routes/home/posts/Root';
import { Post as HomePostsPost } from './routes/home/posts/Post';
import { Report as HomePostsPostReport } from './routes/home/posts/Report';
import { Root as HomeProfileRoot } from './routes/home/profile/Root';
import { Likes as HomeProfileLikes } from './routes/home/profile/Likes';
import { Edit as HomeProfileEdit } from './routes/home/profile/Edit';
import { Report as HomeProfileReport } from './routes/home/profile/Report';
import { New as PostNew } from './routes/posts/New';
import { Setting } from './routes/Setting';
import { Reports as AdminHomeReports } from './routes/admin/home/Reports';
import { Penalty as AdminHomePostsPostPenalty } from './routes/admin/home/posts/Penalty';
import { Root as AdminHomeProfileRoot } from './routes/admin/home/profile/Root';
import { Likes as AdminHomeProfileLikes } from './routes/admin/home/profile/Likes';
import { Penalty as AdminHomeProfilePenalty } from './routes/admin/home/profile/Penalty';
import { NotFound as ErrorNotFound } from './routes/error/NotFound';
import { Unauthorized as ErrorUnauthorized } from './routes/error/Unauthorized';
import { Server as ErrorServer } from './routes/error/Server';

// パスの設定
export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Password Reset */}
        <Route path="/password-reset" element={<PasswordResetRoot />} />
        <Route
          path="/password-reset/verify"
          element={<PasswordResetVerify />}
        />

        {/* Signup */}
        <Route path="/signup" element={<SignupRoot />} />
        <Route path="/signup/verify" element={<SignupVerify />} />
        <Route path="/signup/setting" element={<SignupSetting />} />

        {/* Auth Required */}
        <Route element={<RequireAuth />}>
          <Route path="/home">
            <Route path="notifications" element={<HomeNotifications />} />
            <Route path="posts">
              <Route index element={<HomePostsRoot />} />
              <Route path=":postId" element={<HomePostsPost />} />
              <Route path=":postId/report" element={<HomePostsPostReport />} />
            </Route>
            <Route path="profile">
              <Route path=":userId" element={<HomeProfileRoot />} />
              <Route path=":userId/likes" element={<HomeProfileLikes />} />
              <Route path=":userId/edit" element={<HomeProfileEdit />} />
              <Route path=":userId/report" element={<HomeProfileReport />} />
            </Route>
          </Route>
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        {/* Admin Auth Required */}
        <Route path="/admin" element={<RequireAdminAuth />}>
          <Route path="home">
            <Route path="reports" element={<AdminHomeReports />} />
            <Route
              path="posts/:postId/penalty"
              element={<AdminHomePostsPostPenalty />}
            />
            <Route path="profile">
              <Route path=":userId" element={<AdminHomeProfileRoot />} />
              <Route path=":userId/likes" element={<AdminHomeProfileLikes />} />
              <Route
                path=":userId/penalty"
                element={<AdminHomeProfilePenalty />}
              />
            </Route>
          </Route>
        </Route>

        {/* Error */}
        <Route path="/unauthorized" element={<ErrorUnauthorized />} />
        <Route path="/error" element={<ErrorServer />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};
