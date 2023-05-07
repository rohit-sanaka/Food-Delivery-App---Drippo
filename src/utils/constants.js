export const RESTRO_CDN =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

export const ShimmerSkeletion = () => {
  let Skeletion1 = [];
  for (let i = 0; i < 5; i++) {
    Skeletion1.push(
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          animation="wave"
          height={250}
          width={250}
          style={{ marginBottom: 3 }}
        />
        <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={20} width="80%" />
      </div>
    );
  }
  return Skeletion;
};
