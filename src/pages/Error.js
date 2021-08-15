import { useHistory } from "react-router";

const Error = () => {
  const history = useHistory();
  return (
    <div className="w-11/12 md:w-2/5 mx-auto text-center my-12">
      <h2 className="text-5xl font-extrabold">Error 404</h2>
      <p className="text-lg my-5">We can't find the page you are looking for</p>
      <img src="/images/error.png" alt="404 error" className="mx-auto w-80" />
      <button
        onClick={() => history.push("/")}
        className="py-2 px-10 rounded-full shadow mt-5 text-lg font-bold text-white bg-yellow-500 hover:bg-yellow-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Error;
