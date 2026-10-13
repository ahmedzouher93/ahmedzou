import svgPaths from "./svg-05iav8w7jq";

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c9a227] text-[10px] text-right tracking-[2.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Student Portal</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-right text-white whitespace-nowrap">
        <p className="leading-[24px]" dir="auto">
          بوابة الطلبة
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[121px]" data-name="Container">
      <Container2 />
      <Heading />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p7a2c600} id="Vector" stroke="var(--stroke-0, #C9A227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          <path d={svgPaths.p1fa84c00} id="Vector_2" stroke="var(--stroke-0, #C9A227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          <path d={svgPaths.p2adfac80} id="Vector_3" stroke="var(--stroke-0, #C9A227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          <path d="M14 17.5H21M17.5 14V21" id="Vector_4" stroke="var(--stroke-0, #C9A227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(201,162,39,0.18)] content-stretch flex items-center justify-center p-px relative rounded-[14px] shrink-0 size-[48px]" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(201,162,39,0.35)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Svg />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end pl-[31.33px] relative size-full">
          <Container1 />
          <OverlayBorder />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[24px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] text-right w-[492px]">
        <p className="leading-[25.2px]" dir="auto">
          جداولك الدراسية، نتائجك الأكاديمية، وعمليات التسجيل — كل ذلك في مكان واحد
        </p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]" dir="auto">
            الجدول الدراسي
          </p>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]">📅</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end pl-[86.69px] pr-[15px] py-[11px] relative size-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]" dir="auto">
            النتائج والدرجات
          </p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]">📊</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorder2() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end pl-[91.89px] pr-[15px] py-[11px] relative size-full">
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]" dir="auto">
            تسجيل المواد
          </p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Noto_Kufi_Arabic:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-right whitespace-nowrap">
          <p className="leading-[19.5px]">📝</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorder3() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[11.99px] items-center justify-end pl-[101.13px] pr-[15px] py-[11px] relative size-full">
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <OverlayBorder1 />
      <OverlayBorder2 />
      <OverlayBorder3 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28px] relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[23px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0F3057)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0F3057)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[21.75px] relative shrink-0 w-[88.72px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Kufi_Arabic:Bold',sans-serif] justify-center leading-[0] not-italic right-[-0.42px] text-[#0f3057] text-[14.5px] text-right top-[10px] w-[89.136px]">
        <p className="leading-[21.75px]" dir="auto">
          دخول البوابة
        </p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#c9a227] relative rounded-[12px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[22px] py-[14px] relative size-full">
          <Svg1 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

export default function OverlayBorderShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(8,22,48,0.45)] content-stretch flex flex-col items-start pb-[47px] pt-[48px] px-[23px] relative rounded-[16px] size-full" data-name="Overlay+Border+Shadow+OverlayBlur">
      <div aria-hidden className="absolute border-[rgba(201,162,39,0.5)] border-b border-l border-r border-solid border-t-2 inset-0 pointer-events-none rounded-[16px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.25)]" />
      <Margin />
      <Margin1 />
      <Margin2 />
      <Margin3 />
      <Link />
    </div>
  );
}