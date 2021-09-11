export default function FacilityDetailsItem(props) {
  return (
      <div className="container flex relative">
        {props.imageSrc}
        {props.venue}
        {props.hours}
        {props.address}
        {props.description}
        {props.price}      
        
      </div>
  );
}
