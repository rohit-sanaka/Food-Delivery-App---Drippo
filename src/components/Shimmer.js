import Skeleton from "@mui/material/Skeleton";
export default function Shimmer() {
  let Skeletion1 = [];
  for (let i = 0; i < 16; i++) {
    Skeletion1.push(
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          marginTop: 0,
        }}
      >
        <Skeleton animation="wave" height={300} width={300} />
        <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={20} width="80%" />
      </div>
    );
  }

  return <div className="restro-container">{Skeletion1}</div>;
}
