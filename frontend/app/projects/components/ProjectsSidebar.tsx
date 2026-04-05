import Image from "next/image";
import Link from "next/link";

export default function ProjectsSidebar() {
  return (
    <aside className="bg-base-200 lg:w-70">
      <div className="flex h-full flex-col justify-between px-8 py-10">
        <div className="flex flex-col items-center text-center">
          <div className="avatar mb-5">
            <div className="w-18 rounded-full ring-2 ring-base-100">
              <Image
                src="/profile-avatar.svg"
                alt="Avatar de Lucas Millart"
                width={72}
                height={72}
                priority
              />
            </div>
          </div>
          <h2 className="text-[34px] leading-none font-bold tracking-tight">
            Lucas Millart
          </h2>
          <p className="mt-3 text-sm leading-6 text-base-content/70">
            Concepteur développeur
            <br />
            Info
          </p>
        </div>

        <div className="pt-8 lg:pb-2">
          <Link
            href="#"
            className="btn h-12 w-full rounded-2xl border-0 bg-primary px-6 text-sm font-semibold text-primary-content shadow-[0_14px_26px_-16px_rgba(145,77,0,0.8)] hover:bg-[#a75a04]"
          >
            Télécharger le CV
          </Link>
        </div>
      </div>
    </aside>
  );
}
