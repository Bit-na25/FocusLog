import PageHeader from "@/components/PageHeader";
import logo from "@/assets/focuslog-logo2.png";
import { useOAuthLogin } from "@/hooks/useOAuthLogin";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { facebookProvider, githubProvider, googleProvider } from "@/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useOAuthLogin();

  const handleLogin = (provider: "github" | "google" | "facebook") => {
    let selectedProvider;

    switch (provider) {
      case "github":
        selectedProvider = githubProvider;
        break;
      case "google":
        selectedProvider = googleProvider;
        break;
      case "facebook":
        selectedProvider = facebookProvider;
        break;
    }

    login(selectedProvider)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <PageHeader title="" />
      <section className="min-h-screen flex flex-col items-center justify-center">
        <img className="w-48" src={logo} />
        <h1 className="text-4xl font-bold mb-6">
          Focus<span className="font-normal">Log</span>
        </h1>

        <div className="flex gap-10 mt-24">
          <button
            onClick={() => handleLogin("github")}
            disabled={loading}
            className="bg-gray-800 text-white p-4 rounded-full hover:scale-110 transition-all"
          >
            <FaGithub className="text-lg" />
          </button>
          <button
            onClick={() => handleLogin("google")}
            disabled={loading}
            className="bg-white border p-4 rounded-full hover:scale-110 transition-all"
          >
            <FcGoogle className="text-lg" />
          </button>
          <button
            onClick={() => handleLogin("facebook")}
            disabled={loading}
            className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 transition-all"
          >
            <FaFacebookF className="text-lg" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-6">소셜 계정으로 로그인</p>
      </section>
    </div>
  );
}
