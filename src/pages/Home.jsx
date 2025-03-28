import React, { useEffect, useState } from "react";
import { getUser, removeUser } from "../utils/user";
import { useNavigate } from "react-router";
import SetUp from "@/components/WorkSpace/SetUp";

export default function Home() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      // await removeUser();
      const user = await getUser();
      console.log(user);

      setUser(user);
      if (!user) navigate("/welcome");
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div>not user...</div>;
  return <SetUp />;
}
