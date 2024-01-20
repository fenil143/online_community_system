export default function Register_Lottie() {
  return (
    <>
      <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

      <dotlottie-player
        src="https://lottie.host/38390bb9-ec18-4f7b-847a-f512d1d9955c/ilR9zqRME0.json"
        background="transparent"
        speed="1"
        style={{ width: 'auto', height: '400', margin: 'auto', display: 'block', marginRight:"20px"}}
        loop
        autoplay
      ></dotlottie-player>
    </>
  );
}
