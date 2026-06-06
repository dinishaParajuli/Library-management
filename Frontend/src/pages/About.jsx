export default function About() {
  return (
    <div className="bg-[#fdfaf6] ">
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 py-16">
        <div className="flex-1 flex justify-center">
          <img
            src="/about.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-80 md:w-[28rem] object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#3e2c1c] mb-4">Our Story</h3>
          <p className="text-[#5e4632] mb-6">
            We believe that every book holds the power to inspire and transform.
            Our mission is to provide readers with access to timeless classics
            and modern masterpieces alike, creating a community of lifelong
            learners.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto my-16 px-6 py-10 bg-white rounded-2xl shadow-md">
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Welcome to our small library system! Browse, borrow, and manage books with ease. 
          Our platform helps you explore a wide range of titles and keeps track of your reading journey.
        </p>
      </div>
    </div>
  );
}
