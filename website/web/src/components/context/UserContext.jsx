import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}user/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("User data response:", response);

      if (response.ok) {
        return await response.json();
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Chyba při volání API:", error);
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const savedToken = localStorage.getItem("token");

      if (code) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();

          if (data.sessionToken) {
            localStorage.setItem("token", data.sessionToken);
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname,
            );
          } else {
            const userData = await fetchUserData(savedToken);
            setUser(userData);
          }
        } catch (err) {
          console.error("Auth error:", err);
        }
      } else if (savedToken) {
        const data = await fetchUserData(savedToken);
        if (data) setUser(data);
      }
      setLoading(false);
    };
    initializeAuth();
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
