import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider"; // adjust path if needed

const BookingContactSection = () => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      return Swal.fire("Phone number required", "Please enter your phone number", "warning");
    }

    try {
      setLoading(true);

      const token = await user.getIdToken(); // Firebase token

      const res = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Submitted!", "Admin will contact you soon.", "success");
        setPhone(""); // clear input
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server problem", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Request a Call</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Request Contact"}
        </button>
      </form>
    </div>
  );
};

export default BookingContactSection;
