// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    // Giải mã token để lấy payload (userId, role, name...)
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
};
 const getDriverId = () => {
  const userStr = getUserFromToken();
  return userStr ? userStr.driverId : null;
}
 const getUserId = () => {
  const user = getUserFromToken();
  return user ? user.userId : null;
};
export {
  getDriverId,
  getUserId
}