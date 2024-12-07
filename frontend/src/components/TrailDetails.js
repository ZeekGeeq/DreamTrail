import DisplayDate from "./DisplayDate";

const TrailDetails = ({ trail }) => {
  return (
    <div className="TrailDetails">
      <h4>{<DisplayDate dateString={trail.date} />}</h4>
      <p>
        <strong>DURATION:</strong>
        {trail.duration}
      </p>
      <p>
        <strong>QUALITY:</strong>
        {trail.quality}
      </p>
      <p>{trail.createdAt}</p>
      <br />
    </div>
  );
};

export default TrailDetails;
