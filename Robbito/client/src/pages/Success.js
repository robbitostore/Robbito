import Lottie from "react-lottie";

import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import animationData from "../assets/107043-success.json";
import Layout from "../components/Layout";

const OrderSuccessPage = () => {
  return (
    <div>
      <Layout>
        <Success />
      </Layout>
    </div>
  );
};

const Success = () => {
  // ------------------------->
  const navigate = useNavigate();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full min-h-[90vh]">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-2 text-[25px] italic font-semibold ">
        Your order send successfully 😍
      </h5>
      <h5 className="text-center mb-8 text-[16px] ">
        Our team will contact you within 24 hours.
      </h5>
      <div className="flex items-center justify-center w-full ">
        <button
          className="text-[16px] border-2 flex w-[14rem] items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-700 cursor-pointer transition-all duration-150 text-white rounded-3xl py-2 px-5 shadow-md hover:shadow-xl hover:scale-[1.02] shadow-gray-200 active:scale-[1] filter hover:drop-shadow-md "
          onClick={() => {
            navigate("/");
          }}
        >
          <MdKeyboardBackspace className="h-5 w-5 text-white" />
          Back to Home
        </button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
