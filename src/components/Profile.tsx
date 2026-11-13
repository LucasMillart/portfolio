import { profile } from "@/content/site";
import { PixelPanda } from "./PixelPanda";
import { SocialIcon } from "./SocialIcon";

/** Rend **gras** en blanc, le reste en gris. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
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
    <section>
      {profile.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.avatar}
          alt="Avatar : un panda sprinteur en pixel art"
          className="size-30 rounded-full object-cover"
        />
      ) : (
        <PixelPanda className="size-30" />
      )}

      <h1 className="mt-7 text-3xl font-semibold tracking-tight">{profile.name}</h1>
      <p className="mt-3 text-[15px] leading-7 text-muted">{profile.tagline}</p>

      {profile.bio.length > 0 && (
        <div className="mt-2 space-y-2 text-[15px] leading-7 text-muted">
          {profile.bio.map((line) => (
            <p key={line} className="whitespace-pre-line">
              <Rich text={line} />
            </p>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center gap-2">
        <a
          href={profile.cta.href}
          className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-white/85"
        >
          {profile.cta.label}
        </a>
        <ul className="flex items-center">
          {profile.socials.map((s) => (
            <li key={s.type}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-card hover:text-fg"
              >
                <SocialIcon type={s.type} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
