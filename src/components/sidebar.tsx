export function Sidebar() {
  return(
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        <div className="p-2.5 my-3 flex items-center text-center ">
          <h1 className="font-bold text-gray-200 text-[20px] ml-3">MS ToDo Replica</h1>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      {/* <div
        className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
        <i className="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
        <button></button>
      </div> */}
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">My day</span>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 ">
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className="p-4 my-3 flex items-center rounded-md px-4 space-x-2 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <div>
            <img className="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
          </div>
          <div className="flex justify-start flex-col items-start">
            <p className="cursor-pointer text-sm leading-5 text-white">Alexis Enache</p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300">alexis81@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
};
