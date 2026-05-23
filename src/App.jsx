import { ArrowRight } from "lucide-react";

const navItems = ["Home", "Features", "About", "Pricing", "Resources"];

function HavenLogo() {
  return (
    <a
      className="inline-flex items-center justify-self-start gap-3 text-white drop-shadow-[0_2px_10px_rgba(37,87,129,0.16)] sm:gap-[18px]"
      href="#"
      aria-label="Haven home"
    >
      <span
        className="grid h-[34px] w-[31px] grid-cols-[13px_13px] grid-rows-[17px_17px] gap-x-[5px] sm:h-[42px] sm:w-[38px] sm:grid-cols-[16px_16px] sm:grid-rows-[20px_20px] sm:gap-x-1.5"
        aria-hidden="true"
      >
        <span className="row-span-2 rounded-[9px] bg-current" />
        <span className="col-start-2 row-start-1 rounded-[9px] bg-current" />
        <span className="col-start-2 row-start-2 rounded-[9px] bg-current" />
      </span>
      <span className="text-[1.65rem] font-[760] leading-none tracking-normal sm:text-[clamp(2rem,2vw,2.35rem)]">
        haven
      </span>
    </a>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section
        className="isolate min-h-screen overflow-hidden relative"
        aria-label="Haven landing page"
      >
        <div className="absolute inset-0 -z-30 bg-[url('/haven-hero.png')] bg-cover bg-[38%_center] lg:bg-center" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.34)_0_18%,rgba(255,255,255,0.16)_34%,rgba(255,255,255,0)_58%),linear-gradient(180deg,rgba(145,204,238,0.08)_0%,rgba(238,247,249,0.28)_46%,rgba(214,232,235,0.08)_67%,rgba(18,67,102,0.08)_100%)]" />

        <header className="relative z-10 mx-auto grid h-[72px] w-[min(calc(100%_-_44px),960px)] grid-cols-[auto_auto] items-center min-[1101px]:h-24 min-[1101px]:w-[min(calc(100%_-_92px),1730px)] min-[1101px]:grid-cols-[minmax(170px,1fr)_auto_minmax(170px,1fr)]">
          <HavenLogo />

          <nav
            className="hidden items-center justify-center gap-[clamp(54px,5.1vw,88px)] text-[0.95rem] font-[560] text-white/95 min-[1101px]:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                className={`relative py-4 [text-shadow:0_2px_12px_rgba(46,91,125,0.18)] after:absolute after:bottom-0 after:left-[18%] after:right-[18%] after:h-0.5 after:rounded-full after:bg-current after:content-[''] ${
                  item === "Home"
                    ? "after:opacity-100"
                    : "after:translate-y-[5px] after:opacity-0"
                }`}
                href={`#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            className="inline-flex min-h-[40px] min-w-24 items-center justify-center justify-self-end rounded-full border border-white/90 bg-white/[0.04] px-[22px] text-sm font-[560] text-white shadow-none backdrop-blur-[4px] [text-shadow:0_2px_10px_rgba(50,86,117,0.18)] sm:min-h-[48px] sm:min-w-[136px] sm:border-[1.5px] sm:px-[34px] sm:text-[1.05rem]"
            href="#login"
          >
            Log in
          </a>
        </header>

        <div className="relative z-10 mx-auto mt-[13vh] flex w-[min(calc(100%_-_32px),560px)] flex-col items-center text-center text-[#101010] min-[681px]:mt-[clamp(150px,17vh,205px)] min-[681px]:w-[min(760px,calc(100%_-_48px))] min-[1101px]:mt-[clamp(150px,17vh,205px)]">
          <div
            className="relative mb-[26px] h-[54px] w-[54px] scale-[0.78] text-[rgba(60,130,179,0.72)] min-[681px]:mb-[38px] min-[681px]:scale-100"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-7 w-[9px] origin-[center_-1px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            <span className="absolute left-1/2 top-1/2 h-7 w-[9px] origin-[center_-1px] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-current" />
            <span className="absolute left-1/2 top-1/2 h-6 w-[7px] origin-[center_-1px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current opacity-60" />
            <span className="absolute left-1/2 top-1/2 h-6 w-[7px] origin-[center_-1px] -translate-x-1/2 -translate-y-1/2 rotate-[135deg] rounded-full bg-current opacity-60" />
          </div>

          <h1 className="m-0 max-w-[760px] text-balance text-[clamp(2.2rem,10.5vw,3.35rem)] font-[760] leading-[1.08] tracking-normal text-[#101010] [text-shadow:0_2px_18px_rgba(255,255,255,0.35)] min-[681px]:text-[clamp(4rem,4.35vw,5.2rem)]">
            A virtual workspace that feels refreshingly human
          </h1>
          <p className="mt-[22px] text-[1.02rem] font-[520] leading-[1.42] tracking-normal text-[#171717] [text-shadow:0_1px_14px_rgba(255,255,255,0.4)] min-[681px]:mt-7 min-[681px]:text-[clamp(1.35rem,1.45vw,1.68rem)] [&_br]:hidden min-[681px]:[&_br]:block">
            Meet, chat, and work together like you&apos;re in person.
            <br />
            No scheduling needed for quick interactions.
          </p>

          <a
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#171717] px-7 text-[0.98rem] font-semibold text-white shadow-[0_18px_44px_rgba(14,28,39,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:bg-black min-[681px]:mt-9 min-[681px]:min-h-[62px] min-[681px]:px-9 min-[681px]:text-[1.18rem]"
            href="#join"
          >
            <span>Join space</span>
            <ArrowRight
              className="shrink-0"
              aria-hidden="true"
              size={21}
              strokeWidth={2.2}
            />
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;
