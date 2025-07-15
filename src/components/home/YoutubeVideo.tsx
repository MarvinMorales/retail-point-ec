import YouTube from 'react-youtube';

const YouTubeVideo = () => {
  const videoId = "txja2UVb3GE";
  // Opciones del reproductor (ahora responsive)
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
    },
  };

  const onReady = (event: any) => {
    console.log("Reproductor listo", event);
  };

  return (
    <div className="w-full h-0 pb-[56.25%] relative"> {/* Relación de aspecto 16:9 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onError={(e: any) => console.log("Error al cargar", e)}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default YouTubeVideo;