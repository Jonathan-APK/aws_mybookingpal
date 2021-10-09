import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function Pagination(props) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalRecords / props.recordsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <div
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {" "}
              {props.totalRecords !== 0
                ? props.recordsPerPage * props.currentPage -
                  (props.recordsPerPage - 1)
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {props.totalRecords === 0
                ? 0
                : props.currentPage === pageNumbers.at(-1)
                ? props.totalRecords
                : props.recordsPerPage * props.currentPage}
            </span>{" "}
            of <span className="font-medium">{props.totalRecords}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <div
              onClick={() => {
                if (props.currentPage > 1)
                  props.paginate(props.currentPage - 1);
              }}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {pageNumbers.map((pageNumber) => (
              <div
                key={pageNumber}
                onClick={() => props.paginate(pageNumber)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                  pageNumber === props.currentPage
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                {pageNumber}
              </div>
            ))}
            <div
              onClick={() => {
                if (props.currentPage < pageNumbers.at(-1))
                  props.paginate(props.currentPage + 1);
              }}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
