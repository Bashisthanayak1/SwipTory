
import React, { useState, useEffect, useCallback } from 'react';
import "../AutoSlider/AutoSlider.css"
const AutoSlider = () => {
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyb-UWyOg_94jfFiQb5aH5H6AySQtJwNUpBK4XUW1WA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3m96XVuvD60iHGRa3rL-Ls2Y-gnh4PlCD21wTJHVGEQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkEl8bcmEEFoU6icuDPdyDjM4GeXOV3hZP68muI5ZYg&s",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyb-UWyOg_94jfFiQb5aH5H6AySQtJwNUpBK4XUW1WA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3m96XVuvD60iHGRa3rL-Ls2Y-gnh4PlCD21wTJHVGEQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkEl8bcmEEFoU6icuDPdyDjM4GeXOV3hZP68muI5ZYg&s",];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progressWidths, setProgressWidths] = useState(
        images.map(() => '0%')
    );

    const updateProgress = useCallback(() => {
        setProgressWidths((prevProgressWidths) =>
            prevProgressWidths.map((_, index) =>
                index === currentIndex ? '100%' : '0%'
            )
        );
        setTimeout(() => {
            setProgressWidths((prevProgressWidths) =>
                prevProgressWidths.map((_, index) =>
                    index === currentIndex ? '0%' : '0%'
                )
            );
        }, 50);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        updateProgress();
    }, [images.length, updateProgress]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        updateProgress();
    }, [images.length, updateProgress]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, nextSlide]);

    return (
        <div className="The--main--container">
            <div className="slider-container">
                <div
                    className="slider"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: `transform 0.5s ease-in-out`
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="slide" style={{ width: '100%' }}>
                            <img src={image} alt="" style={{ width: '100%' }} />
                        </div>
                    ))}
                </div>

                <div className="progress-container">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-bar ${index === currentIndex ? 'active' : ''
                                }`}
                            style={{ width: progressWidths[index] }}
                        ></div>
                    ))}
                </div>

                <div className="controls">
                    <button onClick={prevSlide}><i class="fa-solid fa-chevron-left"></i></button>
                    <button onClick={nextSlide}><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default AutoSlider;
