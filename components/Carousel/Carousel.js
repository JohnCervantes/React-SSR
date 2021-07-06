import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import { useRecursiveTimeout } from "./useRecursiveTimeout";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";
// import { mediaByIndex } from "../media";

const AUTOPLAY_INTERVAL = 6000;

function EmblaCarousel () {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);

  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    stop();
  }, [embla, stop]);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    stop();
  }, [embla, stop]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("pointerDown", stop);
  }, [embla, onSelect, stop]);

  useEffect(() => {
    play();
  }, [play]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <Image
                //src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg"
                src="https://images.blz-contentstack.com/v3/assets/blte0bbc3c063f45866/bltf66ce53a194d051b/60cd0878ef929764f0bb44ac/OW_BNetSummer_BlizzardHomepage-Mobile_1536x1536_BS.webp?auto=webp&format=pjpg"
                layout="fill"
                objectFit="cover"
              />
              <p className="slide-item">Slide 1 texts</p>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <Image
                //src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg"
                src="https://images.blz-contentstack.com/v3/assets/blte0bbc3c063f45866/bltf66ce53a194d051b/60cd0878ef929764f0bb44ac/OW_BNetSummer_BlizzardHomepage-Mobile_1536x1536_BS.webp?auto=webp&format=pjpg"
                layout="fill"
                objectFit="cover"
              />
              <p className="slide-item">Slide 2 texts</p>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <Image
                //src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg"
                src="https://images.blz-contentstack.com/v3/assets/blte0bbc3c063f45866/bltf66ce53a194d051b/60cd0878ef929764f0bb44ac/OW_BNetSummer_BlizzardHomepage-Mobile_1536x1536_BS.webp?auto=webp&format=pjpg"
                layout="fill"
                objectFit="cover"
              />
              <p className="slide-item">Slide 3 texts</p>
            </div>
          </div>
          {/* <div className="embla__slide">
            <div className="embla__slide__inner">
              <Image
                src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg"
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>
          </div>
          <div className="embla__slide">
            <div className="embla__slide__inner">
              <Image
                src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg"
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>
          </div> */}
          {/* {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
              <Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image>
              </div>
            </div>
          ))} */}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default EmblaCarousel

// import React from 'react'
// import 'keen-slider/keen-slider.min.css'
// import { useKeenSlider } from 'keen-slider/react'

// export const Test = () => {
//   const [sliderRef] = useKeenSlider({ loop: true })

//   return (<div ref={sliderRef} className="keen-slider">
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//   </div>)
// }

// export default Test
