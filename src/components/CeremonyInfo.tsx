import Image from "next/image";

function FamilyBlock({
  title,
  names,
  relation,
}: {
  title: string;
  names: string;
  relation: string;
}) {
  return (
    <div className="text-center">
      <p className="font-serif text-[0.7rem] tracking-[0.08em] text-cream/80 sm:text-xs">
        {title}
      </p>
      <p className="mt-1 whitespace-pre-line font-serif text-[0.95rem] font-medium leading-snug text-cream sm:text-base">
        {names}
      </p>
      <p className="mt-2 px-2 font-serif text-[0.62rem] leading-relaxed text-cream/70 sm:px-0 sm:text-[0.7rem]">
        {relation}
      </p>
    </div>
  );
}

export default function CeremonyInfo() {
  return (
    <section className="paper-bg relative min-h-dvh overflow-x-clip">
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center px-4 pb-10 pt-8 sm:px-8 sm:pt-10 md:max-w-4xl">
        <h2 className="relative text-center font-serif text-[1.65rem] font-normal leading-[1.15] tracking-[0.08em] text-ink sm:text-4xl md:text-[2.75rem]">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[4.2rem] italic leading-none text-ink/15 sm:text-[6.5rem] md:text-[7.5rem]"
          >
            &amp;
          </span>
          <span className="relative block">SHUHAIB BABU</span>
          <span className="relative mt-1 block">AFREENA K.S</span>
        </h2>

        <div className="relative mt-6 w-full max-w-[21.5rem] sm:mt-8 sm:max-w-xl md:max-w-2xl">
          <article className="relative z-10 rounded-2xl bg-navy px-5 pb-20 pt-8 text-cream shadow-[0_18px_40px_rgba(11,39,72,0.28)] sm:px-12 sm:pb-12 sm:pt-10 md:px-16 md:py-12">
            <p className="text-center font-serif text-[0.72rem] font-medium tracking-[0.28em] sm:text-sm">
              CEREMONY INFO
            </p>

            <div className="relative z-10 mt-7 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-5">
              <FamilyBlock
                title="Mr. & Mrs."
                names={"Babu Muhammed\nMumthaz Babu"}
                relation="Grandson of Late Muhammed Abdul Khader & Late Ali V.P"
              />
              <div className="mx-auto h-px w-16 bg-cream/25 sm:mx-0 sm:h-16 sm:w-px sm:self-center" />
              <FamilyBlock
                title="Mr. & Mrs."
                names={"Shoukaith Ali\nFarijan"}
                relation="Granddaughter of Late Yusif Haji & Late Muhammed"
              />
            </div>

            <p className="relative z-10 mt-8 px-1 text-center font-serif text-[0.62rem] leading-relaxed tracking-[0.08em] text-cream/85 sm:mt-10 sm:px-4 sm:text-[0.7rem] sm:tracking-[0.16em]">
              WITH HEARTS FULL OF JOY,
              <br />
              WE JOYFULLY ANNOUNCE THE WEDDING OF OUR CHILDREN
            </p>

            <div className="relative z-10 mt-6 px-6 text-center sm:mt-8 sm:px-10">
              <p className="font-serif text-[1.7rem] font-normal leading-tight text-cream sm:text-4xl md:text-[2.6rem]">
                Shuhaib Babu
              </p>
              <p className="mt-2 font-serif text-[0.62rem] tracking-[0.28em] text-cream/70">
                GROOM
              </p>
              <p className="my-3 font-serif text-2xl italic text-cream/90 sm:text-3xl">&amp;</p>
              <p className="font-serif text-[1.7rem] font-normal leading-tight text-cream sm:text-4xl md:text-[2.6rem]">
                Afreena K.s
              </p>
              <p className="mt-2 font-serif text-[0.62rem] tracking-[0.28em] text-cream/70">
                BRIDE
              </p>
            </div>
          </article>

          <div className="flower-bob pointer-events-none absolute -bottom-2 -left-10 z-20 w-[58%] max-w-[10.5rem] sm:-bottom-8 sm:-left-14 sm:w-[52%] sm:max-w-[16rem] md:-left-20 md:max-w-[18.5rem]">
            <Image
              src="/images/flower-bl.png"
              alt=""
              width={1122}
              height={1402}
              className="h-auto w-full select-none"
            />
          </div>
          <div className="flower-bob-alt pointer-events-none absolute -bottom-2 -right-10 z-20 w-[58%] max-w-[10.5rem] sm:-bottom-4 sm:-right-14 sm:w-[52%] sm:max-w-[16rem] md:-right-20 md:max-w-[18.5rem]">
            <Image
              src="/images/flower-br.png"
              alt=""
              width={1122}
              height={1402}
              className="h-auto w-full select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
