export default function Contact() {
  return (
    <div className="bg-[#fdfaf6] ">
      {/* Top Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-[#3e2c1c]">Contact Us</h2>
            <p className="text-gray-600">
              Contact us for support, inquiries, or feedback, and let us help
              you make the most of our library resources.
            </p>

            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-600">
                Sundarharicha-6,Dulari
                <br />
                Morang
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">98000000000</p>
            </div>

            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">booklove@gmail.com</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-[500px] mt-20 mr-0 flex justify-center">
            <img
              src="contact.jpg"
              alt="contact"
              className="w-80 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-semibold">Get In Touch</h3>
          <p className="text-gray-600">
            We’d love to hear from you. Please contact us with any questions or
            feedback.
          </p>
          <form className="mt-8 space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none mt-4 md:mt-0"
              />
            </div>

            <textarea
              placeholder="Message"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-[20%] py-2 rounded-md bg-[#7b4b2a] text-white font-medium hover:bg-[#5c3620] transition"
            >
              SEND REQUEST
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
