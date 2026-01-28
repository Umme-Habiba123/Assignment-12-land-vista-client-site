import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['my-reviews', user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This review will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        refetch();
      } catch (error) {
        console.log(error)
        Swal.fire("Error!", "Failed to delete the review.", "error");
      }
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto bg-white text-black">
      {reviews.length === 0 ? (
        <p className="text-center text-red-500">You have not given any reviews yet.</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="border border-red-500 p-4 rounded-xl shadow-lg bg-white">
            <h3 className="text-lg font-semibold text-red-600">{review.propertyTitle}</h3>
            <p className="text-sm text-black">Agent: {review.agentName}</p>
            <p className="text-sm text-gray-500">Time: {new Date(review.reviewedAt).toLocaleString()}</p>
            <p className="mt-2 text-black">{review.review}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white mt-3"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
