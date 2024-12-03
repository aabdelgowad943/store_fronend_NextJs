import React from "react";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    title: "Author & Reader",
    feedback:
      "This bookstore has an amazing collection of PDFs! The layout is user-friendly, and the download process is seamless.",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image links
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Student",
    feedback:
      "As a student, I found all the educational resources I needed. The quality of the PDFs is outstanding!",
    avatar:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Mike Johnson",
    title: "Business Professional",
    feedback:
      "I was able to find excellent resources for my professional development. Highly recommended!",
    avatar:
      "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function Testimonials() {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-sm ">{testimonial.title}</p>
              <p className="mt-4 ">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
