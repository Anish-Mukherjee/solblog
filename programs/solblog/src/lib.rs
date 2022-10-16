use anchor_lang::prelude::*;

declare_id!("75UsBAF7211hxGY4Fzs2kMYAk3QTutTvxjYejA9TNfB4");

#[program]
pub mod solblog {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        title: String,
        content: String
    ) -> Result<()> {
        let blog = &mut ctx.accounts.blog;
        blog.author = ctx.accounts.poster.key();
        blog.title = title;
        blog.content = content;
        blog.likes = 0;
        blog.dislikes = 0;
        msg!("Successfully posted blog");
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title:String,content:String)]
pub struct Initialize<'info> {
    #[account(init,seeds=[title.as_bytes(),poster.key().as_ref()],bump,payer=poster,space=8+32+4+title.len()+4+content.len()+8+8)]
    pub blog: Account<'info, Blog>,
    #[account(mut)]
    pub poster: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Blog {
    pub author: Pubkey,
    pub title: String,
    pub content: String,
    pub likes: u64,
    pub dislikes: u64,
}
