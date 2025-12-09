import { Zoom } from "@/components/display/Zoom/Zoom";

export const Baubles = () => {
  return (
    <>
      <Zoom
        className="w-[18px] lg:w-[18px] xl:w-[18px] 2xl:w-[18px] top-[30%] right-[27%]"
        trigger={{
          image: "/images/scenes/scene1/zoomable/redbauble-trigger.png",
          alt: "Zoom Red Bauble",
        }}
        objectToZoom={{
          image: "/images/scenes/scene1/zoomable/redbauble.png",
          alt: "Red Bauble",
        }}
      />

      <Zoom
        className="w-[18px] lg:w-[18px] xl:w-[18px] 2xl:w-[18px] top-[52%] right-[22%]"
        trigger={{
          image: "/images/scenes/scene1/zoomable/goldbauble-trigger.png",
          alt: "Zoom Gold Bauble",
        }}
        objectToZoom={{
          image: "/images/scenes/scene1/zoomable/goldbauble.png",
          alt: "Gold Bauble",
        }}
      />

      <Zoom
        className="w-[18px] lg:w-[18px] xl:w-[18px] 2xl:w-[18px] top-[51%] right-[30.5%]"
        trigger={{
          image: "/images/scenes/scene1/zoomable/greenbauble-trigger.png",
          alt: "Zoom Green Bauble",
        }}
        objectToZoom={{
          image: "/images/scenes/scene1/zoomable/greenbauble.png",
          alt: "Green Bauble",
        }}
      />
    </>
  );
};
