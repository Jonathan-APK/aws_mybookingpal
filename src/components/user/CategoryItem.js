export default function CategoryItem(props) {
  return (
    <div className="group relative">
      <div className="w-full min-h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
        <img
          src={props.imageSrc}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-base text-gray-700">
            <a href={props.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {props.name}
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
