function Comment({ name, content, timestamp }) {
  return (
    <div className="flex items-center py-[6px] px-[20px]">
      <div className="flex items-center bg-white min-w-[400px] px-[10px] py-[6px] rounded-md">
        <img
          src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-1/153228756_422142489066403_163080274611275956_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGDOhEmcnPknLW3fC0OVPoIcoxI237tcPFyjEjbfu1w8UssIwBgu7tnl1BH8gOlPGdAuirNjTJg9BQBpKTaOoha&_nc_ohc=UTzhznKUMLQQ7kNvgFWYRHX&_nc_ht=scontent.fdad3-5.fna&_nc_gid=AHnkHD1zo_0kfruL0RsIlRl&oh=00_AYCh4NLhei7aTXuZW7cueOdg4xjqTm_b9yMCTLbkj7Z2IA&oe=67301419"
          className="rounded-full h-[40px] w-[40px]"
        />
        <div className="ml-[6px] flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-black">{name}</h3>
            <p className="text-[rgba(0,0,0,0.6)] text-[12px]">{timestamp}</p>
          </div>
          <p className="text-[rgba(0,0,0,0.6)] text-[14px]">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
