import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { Solblog } from "../target/types/solblog";

describe("solblog", async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.Solblog as Program<Solblog>;

  const blog = {
    title: "The first blog",
    content: "Lorem ipsum dolores amigos hasta la vista huevos rancheros"
  }

  const [blog_pda] = await anchor.web3.PublicKey.findProgramAddressSync([Buffer.from(blog.title), provider.wallet.publicKey.toBuffer()], program.programId)

  it("Adds a new blog post", async () => {
    await program.methods
      .initialize(blog.title, blog.content)
      .accounts({
        blog: blog_pda
      })
      .rpc()

    const account = await program.account.blog.fetch(blog_pda)

    console.log(account.content)

    expect(account.author === provider.wallet.publicKey)
    expect(account.title === blog.title)
    expect(account.content === blog.content)
    expect(account.likes.toNumber() === 0)
    expect(account.dislikes.toNumber() === 0)
  })

  it("Updates an existing post", async () => {
    const new_content = "This is updated blog content!"

    await program.methods
      .updatePost(blog.title, new_content)
      .accounts({
        blog: blog_pda
      })
      .rpc()

    const account = await program.account.blog.fetch(blog_pda)

    console.log(account.content)

    expect(account.content === new_content)
  })
});
