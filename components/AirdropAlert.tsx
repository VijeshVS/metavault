import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { ArrowDownFromLine, ArrowDownToLine, HandCoins, PlaneIcon, Trophy } from "lucide-react";
import { split } from "postcss/lib/list";
import { useState } from "react";
import { toast } from "sonner";

export function DialogDemo({ publicKey }: { publicKey: PublicKey }) {
  const [sol, setSol] = useState("");

  async function airdropSOL(publicKey: PublicKey) {
    let sl = Number.parseInt(sol);
    if(sl > 10) sl = 10;
    toast.info(`Requesting airdrop of ${sl} SOL !!`);
    const connection = new Connection(clusterApiUrl("devnet"));
    let amt = Number.parseInt(sol) * LAMPORTS_PER_SOL;
    if (amt > 10 * LAMPORTS_PER_SOL) {
      amt = 10 * LAMPORTS_PER_SOL;
    }
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      amt
    );
    // @ts-ignore
    await connection.confirmTransaction({signature: airdropSignature});
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowDownToLine size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Airdrop SOL</DialogTitle>
          <DialogDescription>
            Airdrop some SOL for your wallet
          </DialogDescription>
          <DialogDescription className="font-medium text-red-400">
            Max airdrop is 10 SOL
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2 mt-2">
            <Input
              id="name"
              placeholder="Enter amount of SOL"
              className="col-span-3"
              value={sol}
              onChange={(e) => setSol(e.target.value)}
            />
          
        </div>
        <DialogClose className="flex justify-end cursor-default">
          <Button
            onClick={() => {
              airdropSOL(publicKey)
                .then(() => {
                  toast.success("Airdropped successfully !!");
                })
                .catch((e) => {
                  toast.error("Airdrop limit breached !!");
                });
            }}
            type="submit"
          >
            Airdrop
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
