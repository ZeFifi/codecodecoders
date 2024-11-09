import { YouTubeEmbed } from "@next/third-parties/google";

export const MdxYouTube = ({ id }: { id: string }) => {
  return (
    <div className="py-6">
      <YouTubeEmbed videoid={id} />
    </div>
  );
};
