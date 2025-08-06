import axios from "axios";

const refreshToken = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
      {
        withCredentials: true,
      }
    );
    return true;
    
  } catch (error) {
    console.error("❌ Refresh token failed", error);
    return false;
  }
};

export default refreshToken;
