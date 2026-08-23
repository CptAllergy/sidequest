import { useAuth } from "@zitadel/react-auth";
import { IconLogout } from "@tabler/icons-react";

export default function LogoutButton() {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.signoutRedirect({
      post_logout_redirect_uri:
        import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL ||
        window.location.origin + "/",
    });
  };

  return (
    <div onClick={handleLogout}>
      <IconLogout />
      Log out
    </div>
  );
}
