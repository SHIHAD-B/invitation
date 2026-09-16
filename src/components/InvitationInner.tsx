import Image from "next/image";
import CeremonyInfo from "@/components/CeremonyInfo";
import ReceptionInfo from "@/components/ReceptionInfo";
import ReceptionVenue from "@/components/ReceptionVenue";
import Guestbook from "@/components/Guestbook";

function SaveTheDateMark() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 72 12"
        className="h-3 w-[4.5rem] text-gold sm:h-3.5 sm:w-20"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 6h22M46 6h22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M36 1.5 38.2 5.4 42.5 6 38.2 6.6 36 10.5 33.8 6.6 29.5 6 33.8 5.4Z"
          fill="currentColor"
        />
      </svg>
      <p className="mt-2 font-serif text-[0.68rem] font-medium tracking-[0.38em] text-ink sm:text-xs sm:tracking-[0.42em]">
        SAVE THE DATE
      </p>
    </div>
  );
}

export default function InvitationInner() {
  return (
    <div className="invite-in bg-[#f3eee4]">
      <section className="relative flex min-h-dvh w-full flex-col overflow-x-clip">
      <Image
        src="/images/inner-bg.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-[80%_center] sm:object-right"
      />

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center px-4">
        <div className="relative z-20 pt-[max(2.25rem,env(safe-area-inset-top))]">
          <SaveTheDateMark />
        </div>

        <div className="flex w-full flex-1 items-center justify-center pt-16 pb-8 sm:pt-20 sm:pb-10">
          <div className="relative mx-auto w-[min(92vw,22.5rem)] sm:w-[min(84vw,30rem)] md:w-[34rem]">
            <div className="flower-bob pointer-events-none absolute top-[22%] -left-[22%] z-[2] w-[44%] max-w-[10.5rem] sm:-left-[24%] sm:max-w-[13rem]">
              <Image
                src="/images/flower-spray.webp"
                alt=""
                width={720}
                height={900}
                className="h-auto w-full select-none"
              />
            </div>

            <Image
              src="/images/envelop-cover.webp"
              alt=""
              width={1701}
              height={925}
              className="pointer-events-none absolute left-0 top-[-12%] z-[1] h-auto w-full select-none"
            />

            <div className="photo-clip absolute inset-x-0 top-0 z-[4] h-[80.5%]">
              <div className="photo-left absolute top-[8%] left-[14%] w-[40%] sm:left-[16%] sm:w-[38%]">
                <div className="overflow-hidden bg-[#fbfaf6] p-[3px] shadow-[0_12px_28px_rgba(20,40,70,0.22)] sm:p-1">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/images/photo2.webp"
                      alt="Shuhaib and Afreena together"
                      fill
                      sizes="(max-width: 768px) 38vw, 200px"
                      className="object-cover object-[50%_18%]"
                    />
                  </div>
                </div>
              </div>

              <div className="photo-right absolute top-[14%] left-[40%] w-[44%] sm:left-[42%] sm:w-[42%]">
                <div className="overflow-hidden bg-[#fbfaf6] p-[3px] shadow-[0_14px_30px_rgba(20,40,70,0.24)] sm:p-1">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/images/photo1.webp"
                      alt="Shuhaib and Afreena walking together"
                      fill
                      sizes="(max-width: 768px) 42vw, 220px"
                      className="object-cover object-[50%_16%]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/images/envelop.webp"
              alt=""
              width={1254}
              height={1254}
              priority
              className="relative z-[5] h-auto w-full select-none"
            />

            <div className="flower-bob-alt pointer-events-none absolute top-[28%] -right-[12%] z-[6] w-[46%] max-w-[11rem] sm:-right-[14%] sm:max-w-[13.5rem]">
              <Image
                src="/images/flower-spray.webp"
                alt=""
                width={720}
                height={900}
                className="h-auto w-full scale-x-[-1] select-none"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
      <CeremonyInfo />
      <ReceptionInfo />
      <ReceptionVenue />
      <Guestbook />
    </div>
  );
}
