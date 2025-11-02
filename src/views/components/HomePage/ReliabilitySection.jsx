import protection from "../../../assets/protection.png";
import customerService from "../../../assets/customer-service.png";
import hand from "../../../assets/hand.png";

function ReliabilitySection() {
    return (
        <div className="">
            {/* Grid layout for all screen sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                {/* Element 1 */}
                <div className="p-4 px-16 flex flex-col items-center">
                    <img
                        src={protection}
                        alt="Returns & Warranty"
                        className="w-20 h-20 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Returns & Warranty</h3>
                    <p className="text-sm">Buy with confidence! Our products come with a warranty and easy return policy.</p>
                </div>

                {/* Element 2 */}
                <div className="p-4 px-16 flex flex-col items-center">
                    <img
                        src={customerService}
                        alt="Customer Support"
                        className="w-20 h-20 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                    <p className="text-sm">Get help anytime! Our friendly customer support team is here for you.</p>
                </div>

                {/* Element 3 */}
                <div className="p-4 px-16 flex flex-col items-center">
                    <img
                        src={hand}
                        alt="EMI Available"
                        className="w-20 h-20 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">EMI Available</h3>
                    <p className="text-sm">Buy now, pay later! Easy monthly installments for up to 12 months on your credit card.</p>
                </div>
            </div>
        </div >
    );
}

export default ReliabilitySection;
