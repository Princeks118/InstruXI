export const Videoplayer = ({ url }) => {
  if (!url) return <div>No video URL provided</div>;

  const secureUrl = url.startsWith("http://")
    ? url.replace("http://", "https://")
    : url;

  return (
    <div className="w-full aspect-video">
      <video
        controls
        width="100%"
        height="auto"
        className="rounded shadow"
      >
        <source src={secureUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};


