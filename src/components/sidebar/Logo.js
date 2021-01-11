const Logo = ({ width, fillColor }) => {
  return (
    <svg
      width={width}
      height="auto"
      viewBox="0 0 519 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M259.808 0L309.808 86.6025L50 236.603L9.53674e-07 150L259.808 0Z"
        fill={fillColor}
      />
      <path
        d="M468.808 363L518.808 449.603L259 599.603L209 513L468.808 363Z"
        fill={fillColor}
      />
      <path
        d="M518.808 150L468.808 236.603L209 86.6025L259 0L518.808 150Z"
        fill={fillColor}
      />
      <path
        d="M149 150H9.53674e-07L2.38419e-07 220.053L149 306.078V150Z"
        fill={fillColor}
      />
      <path
        d="M149 421.548L2.38419e-07 335.523V450H149V421.548Z"
        fill={fillColor}
      />
      <path
        d="M309.808 513L259.808 599.603L0 449.603L50 363L309.808 513Z"
        fill={fillColor}
      />
      <path d="M519 380.363L369 293.76V450H519V380.363Z" fill={fillColor} />
      <path d="M369 178.29L519 264.893V150H369V178.29Z" fill={fillColor} />
    </svg>
  );
};

export default Logo;
