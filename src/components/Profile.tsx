import { profile } from "@/content/site";
import { PixelPanda } from "./PixelPanda";
import { SocialIcon } from "./SocialIcon";

/** Rend **gras** en blanc, le reste en gris. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Profile() {
  return (
    <section className="relative">
      <div aria-hidden className="dot-grid pointer-events-none absolute -top-10 -left-10 h-64 w-96" />

      <div className="relative">
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar} alt="" className="size-24 rounded-full object-cover" />
        ) : (
          <PixelPanda className="size-30" />
        )}

        <h1 className="mt-6 text-4xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-3 leading-relaxed text-muted">{profile.tagline}</p>

        <div className="mt-5 space-y-4 leading-relaxed text-muted">
          {profile.bio.map((line) => (
            <p key={line}>
              <Rich text={line} />
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-line p-2 pl-5">
          <span className="truncate text-muted">{profile.email}</span>
          <a
            href={profile.cta.href}
            className="ml-auto shrink-0 rounded-xl bg-fg px-4 py-2.5 font-medium text-bg transition hover:bg-white/80"
          >
            {profile.cta.label}
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap gap-5 text-muted">
          {profile.socials.map((s) => (
            <li key={s.type}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-fg"
              >
                <SocialIcon type={s.type} />
                <span className="text-sm">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
