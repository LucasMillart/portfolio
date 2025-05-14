import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/planet-of-lana-moewalls-com.mp4" type="video/mp4" />
        </video>
      </div>

      <main className="min-h-screen p-8 md:p-24 max-w-6xl mx-auto">
        {/* Header / Hero Section */}
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-zoom">
            Développeur Full Stack
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md">
            Création d&apos;applications web modernes et intuitives
          </p>
        </header>

        {/* Section à propos de moi */}
        <section id="about" className="mb-20 p-6 rounded-lg shadow-lg bg-black/25 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2 text-white">À propos de moi</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-square relative bg-gray-200 bg-opacity-20 rounded-lg overflow-hidden">
                {/* <Image 
                  src="/ma-photo.jpg"
                  alt="Votre photo"
                  fill
                  className="object-cover"
                /> */}
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Votre photo</p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="mb-4 text-gray-200">
                Présentez-vous ici. Parlez de votre parcours, de vos expériences et de ce qui vous passionne dans le développement.
              </p>
              <p className="text-gray-200">
                Expliquez ce que vous pouvez apporter à des projets et ce qui vous différencie des autres développeurs.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="mb-20 p-6 rounded-lg bg-black/25 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2 text-white">Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["JavaScript", "React", "Node.js", "Next.js", "MongoDB", "Tailwind CSS", "Java", "Python"].map((tech) => (
              <div key={tech} className="bg-gray-800/50 p-4 rounded-4xl text-center hover:shadow-md transition-shadow text-gray-200 font-medium">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="p-6 rounded-lg hover:shadow-xl transition-shadow ">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2 text-white">Mes projets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Projet ChatBot */}
            <div className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 bg-opacity-20 relative border-2 border-black">
                <div className="flex items-center justify-center h-full">
                  <Link
                    href="https://ai-chatbot-lm.vercel.app/">
                    <Image
                      src="/chatgpt-chatbot.png"
                      alt="Image du chatbot"
                      fill
                      className="w-full h-auto object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div className="bg-white p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 text-black">First AI chatbot</h3>
                <p className="text-black mb-4">Création d&apos;un chatbot avec Llama</p>
                <div className="flex gap-3">
                  <Link href="https://ai-chatbot-lm.vercel.app/" className="text-blue-500 hover:underline">Demo</Link>
                  <Link href="https://github.com/LucasMillart/ai-chatbot" className="text-blue-500 hover:underline">Code source</Link>
                </div>
              </div>
            </div>
            {/* Projet Snake */}
            <div className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 bg-opacity-20 relative border-2 border-black">
                <div className="flex items-center justify-center h-full">
                  <Link
                    href="https://ai-chatbot-lm.vercel.app/">
                    <Image
                      src="/chatgpt-chatbot.png"
                      alt="Image du jeux snake"
                      fill
                      className="w-full h-auto object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div className="bg-white p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 text-black">Jeux Snake</h3>
                <p className="text-black mb-4">Création d&apos;un jeux snake avec NextJs</p>
                <div className="flex gap-3">
                  <Link href="https://ai-chatbot-lm.vercel.app/" className="text-blue-500 hover:underline">Demo</Link>
                  <Link href="https://github.com/LucasMillart/ai-chatbot" className="text-blue-500 hover:underline">Code source</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}