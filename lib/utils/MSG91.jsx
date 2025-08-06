import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const OTPOnClick = () => {
  const configRef = useRef(null);
  const router = useRouter();
  const [loginLoading, setloginLoading] = useState(false); // 💡 Loading state

  useEffect(() => {
    configRef.current = {
      widgetId: "35686471434f343736393031",
      tokenAuth: process.env.NEXT_PUBLIC_MSG91_AUTH,
      identifier: "",
      exposeMethods: false,
      success: async (data) => {
        setloginLoading(true); // ✅ Show loading

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/general/msg91verifyotp`,
            {
              token: data.message,
            },
            {
              withCredentials: true,
            }
          );

          const result = response.data;

          if (result.success && result.data.onboarding) {
            router.push(result.data.onboardingURL);
          } else {
            localStorage.setItem("user", JSON.stringify(result.data.user || {}));
            localStorage.setItem("isLoggedin", true);
            window.dispatchEvent(new Event("loginStatusChanged"));
            router.push("/");
          }
        } catch (error) {
          console.error("❌ Error sending token to server:", error);
        } finally {
          setloginLoading(false); // 🧹 Remove loading (just in case redirection fails)
        }
      },
      failure: (err) => {
        console.error("❌ OTP fail", err);
      },
    };

    const script = document.createElement("script");
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.type = "text/javascript";
    script.onload = () => {}
    document.body.appendChild(script);
  }, []);

  const handleOTP = () => {
    if (typeof initSendOTP === "function" && configRef.current) {
      initSendOTP(configRef.current);
    } else {
      console.error("⚠️ OTP not ready");
    }
  };

  return (
    <>
      <Button
        onClick={handleOTP}
        className="bg-lime-500 text-black font-bold text-[17px] font-serif h-10 hover:text-white px-5"
        disabled={loginLoading}
      >
        {loginLoading ? "Verifying..." : "Login"}
      </Button>

      {loginLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

        </div>
      )}
    </>
  );
};

export default OTPOnClick;
