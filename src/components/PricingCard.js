import { IoCheckmarkCircle } from "react-icons/io5";

const PricingCard = ({ originalPrice, discountPrice, features, onContinue }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Course Details</h2>
        <p className="text-gray-400">Universal JavaScript Course</p>
      </div>

      <div className="bg-academy-dark/50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Original Price</span>
          <span className="text-gray-500 line-through">₦{originalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Early Bird Price</span>
          <span className="text-2xl font-bold text-academy-yellow">₦{discountPrice.toLocaleString()}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3 text-gray-300">
            <IoCheckmarkCircle className="text-academy-yellow" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button onClick={onContinue} className="btn-primary w-full">
        Continue to Registration
      </button>
    </>
  );
};

export default PricingCard;