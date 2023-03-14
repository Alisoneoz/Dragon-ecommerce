import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex justify-center text-4xl">
      <div className="flex items-center">
        <CgSpinner className="animate-spin" />
        <span className="animate-pulse">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
