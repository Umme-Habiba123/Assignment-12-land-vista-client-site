import { Phone, Mail } from "lucide-react";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const BookingContactSection = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Stop empty or invalid numbers
    if (!phone.trim()) {
      toast.error("📱 Phone number is required");
      return;
    }

    if (phone.trim().length < 11) {
      toast.error("📱 Enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("❌ You must be logged in!");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: phone.trim() }), // ✅ trimmed phone
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Thanks! We’ll contact you soon.");
        setPhone("");
      } else {
        toast.error("❌ " + (data.message || "Failed to send"));
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20 px-6 md:px-20">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl w-full">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Interested To <span className="text-red-600 font-bold">Book?</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Please provide your phone number, our representative will contact you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-md border border-gray-300 rounded-lg overflow-hidden"
          >
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-500 bg-transparent"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-black text-white px-6 py-3 font-medium transition-all disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="border border-red-300 rounded-lg p-5 inline-block">
            <p className="text-gray-700 text-lg font-medium">
              Hotline: <span className="text-red-600 font-semibold">16254</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="text-red-600" />
            <p className="text-base">01873333199</p>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-red-600" />
            <p className="text-base">habibaislammim@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingContactSection;
