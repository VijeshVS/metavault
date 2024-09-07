"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createWallet } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { walletAtom } from "@/store/store";
import { walletType } from "@/interfaces/types";
import { motion } from "framer-motion";

const SelectToken = () => {
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const [wallets, setWallets] = useRecoilState(walletAtom);

  useEffect(() => {
    if (token != "") {
      const wallet: walletType | {} = createWallet(
        localStorage.getItem("phrases"),
        token,
        wallets.length
      );
      setWallets([...wallets, wallet as walletType]);
      router.push("/dashboard");
      toast.success(`${token} wallet has been created successfully`, {
        duration: 2000,
      });
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="flex flex-col space-y-4"
    >
      <h1 className="text-xl font-medium">
        Select the token for which the wallet has to be created
      </h1>
      <div className="flex space-x-4">
        <Button onClick={() => setToken("Solana")} variant="outline">
          Solana
        </Button>
        <Button onClick={() => setToken("Ethereum")} variant="outline">
          Ethereum
        </Button>
      </div>
    </motion.div>
  );
};

export default SelectToken;
