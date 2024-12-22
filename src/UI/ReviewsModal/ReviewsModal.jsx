import React from "react"
import "./reviewsModal.scss"
import { FaUserAlt } from "react-icons/fa"
import { Rate } from "antd"

const reviews = [
  {
    user: "Tarranc M.",
    name: "Sophia Star",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    review:
      "I've seen incredible progress since I started training with Terrance M. Their expertise and encouragement keep me focused, and I've never felt stronger or healthier. Truly the best coach I've ever had.",
  },
  {
    user: "Chris P.",
    name: "Emily Green",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    review:
      "Chris is an exceptional trainer! I feel so much healthier and happier since working with him. Highly recommended!",
  },
  {
    user: "Alex G.",
    name: "Jordan Miles",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    review:
      "Alex's training sessions are the highlight of my week! His guidance has transformed my fitness routine.",
  },
  {
    user: "Megan H.",
    name: "Zara Williams",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    review:
      "Megan is wonderful to work with! Her sessions are both fun and effective.",
  },
  {
    user: "Nathan K.",
    name: "Leo Scott",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 3,
    review:
      "Nathan is a good coach, but I found some sessions too intense. Overall, I made great progress.",
  },
  {
    user: "Sarah L.",
    name: "Lily Evans",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    review: "Sarah is amazing! Her training style is motivating and effective.",
  },
  {
    user: "Tommy B.",
    name: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    review:
      "Tommy has helped me achieve my fitness goals faster than I expected!",
  },
  {
    user: "Lisa W.",
    name: "Amelia Fox",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    review:
      "Lisa is a fantastic trainer. Her workouts are challenging but enjoyable.",
  },
  {
    user: "Kevin M.",
    name: "Ethan Lee",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    review:
      "Kevin’s training style is exceptional. I feel more energetic and fit!",
  },
  {
    user: "Rachel F.",
    name: "Sophie Brown",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    review:
      "Rachel's guidance is invaluable. She’s incredibly supportive and knowledgeable.",
  },
]

const ReviewsModal = () => {
  return (
    <div className="reviewsModalWrapper">
      <div className="reviewsModalWrapp">
        <div className="userDetails">
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
          <div>

          <h3> Jhonny Mia</h3>
          <p>Ratings <b>4.5/5</b></p>
          </div>
        </div>
        <div className="reviewFlexWrapper">

        {reviews.slice(0, 5).map((review, index) => (
          <div key={index} className="reviewFlexWrapp">
            <div className="reviewFlex">
              <img src={review.image} alt={`${review.name}'s photo`} />
              <div className="reviewWrapp">
                <div className="review">
                  <h2 style={{}}>{review.name}</h2>
                  <Rate count={5} value={review.rating} />
                </div>
                <p>{review.review}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsModal
