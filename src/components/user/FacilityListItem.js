export default function FacilityListItem(props) {
  return (
      <div className="container flex border bg-white h-48 p-5 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
        <img src={props.imageSrc} className="rounded w-40 h-auto" />
        <div className="max-w-xl w-full px-5">
          <h1 className="text-2xl text-gray-800 font-semibold">{props.venue}</h1>
          <h2 className="text-gray-700 font-medium">{props.address}</h2>
          <h3 className="text-gray-700 font-medium -mt-1.5 mb-2">
            Operating Hours: {props.hours}
          </h3>
          <p className="truncate text-gray-600 text-sm leading-tight tracking-normal">
            {props.description}
          </p>
        </div>
        <div className="flex flex-wrap place-content-center">
          <div className="text-center text-3xl text-gray-800 font-semibold mb-3">
            ${props.price}/hr
          </div>
          <button className="py-2 px-4 hover:bg-blue-800 bg-blue-600 text-white rounded-md shadow-xl">
            <a href={props.href}>
              <span aria-hidden="true" />
              Check Availability
            </a>
          </button>
        </div>
      </div>
  );
}