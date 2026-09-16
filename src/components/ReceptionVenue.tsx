const MAPS_LINK = "https://maps.app.goo.gl/qvE6iprPsUTAaYhq9";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.4!2d76.6786074!3d10.7169938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86d19aac1983d%3A0xdce5834320e8fe2c!2sAiswarya%20Auditorium!5e0!3m2!1sen!2sin";

function DirectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
    </svg>
  );
}

export default function ReceptionVenue() {
  return (
    <section className="paper-bg relative overflow-x-clip px-4 pb-8 pt-8 sm:px-8 sm:pt-10">
      <div className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-xl md:max-w-2xl">
        <h2 className="font-serif text-lg font-bold tracking-[0.18em] text-ink sm:text-2xl sm:tracking-[0.2em]">
          WEDDING RECEPTION VENUE
        </h2>
        <p className="mt-2 font-serif text-[0.72rem] leading-relaxed text-ink/80 sm:text-sm">
          Aiswarya Auditorium, Thottupalam, Kinassery(po), Palakkad
        </p>

        <div className="mt-5 overflow-hidden rounded-md bg-cream shadow-[0_12px_28px_rgba(11,39,72,0.12)] sm:mt-7">
          <iframe
            title="Aswarya Auditorium on Google Maps"
            src={MAP_EMBED}
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-navy bg-[#fbf8f1] px-5 py-2 font-sans text-sm text-navy touch-manipulation sm:mt-6 sm:px-6 sm:text-[0.95rem]"
        >
          <DirectionsIcon />
          Get directions
        </a>
      </div>
    </section>
  );
}
