import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Solblog } from "../target/types/solblog";

describe("solblog", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solblog as Program<Solblog>;

  
});
