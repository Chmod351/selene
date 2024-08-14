import Image from "next/image";
function LandingCard() {
  return (
    <article className="h-[412px] w-[260px] flex flex-col justify-center font-helvetica m-auto hover:cursor-pointer">
      <Image src="/Imagen pegada.png" alt="landing" width={260} height={412} />
      <div className="flex flex-col justify-left m-auto">
        <strong>$5000</strong>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
    </article>
  );
}

export default LandingCard;
