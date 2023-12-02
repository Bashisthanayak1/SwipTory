
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../AutoSlider/AutoSlider.css"
import Navbar from "../../PagesJS/Navbar/navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AutoSlider = (props) => {
    const Navigate = useNavigate();

    // const images = [
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyb-UWyOg_94jfFiQb5aH5H6AySQtJwNUpBK4XUW1WA&s",
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3m96XVuvD60iHGRa3rL-Ls2Y-gnh4PlCD21wTJHVGEQ&s",
    //];

    const location = useLocation();

    // // Parse the slicedArray from the URL query parameter
    const slicedArrayString = new URLSearchParams(location.search).get('slicedArray');
    // console.log('slicedArrayString- ', slicedArrayString);
    const slicedArray = slicedArrayString ? JSON.parse(decodeURIComponent(slicedArrayString)) : [];
    //  console.log('slicedArray:', slicedArray);


    //getting array of objects from Foodpage and extracting array of images from it
    // const images = slicedArray.map((obj, i) => obj.Add_Image_URL);
    const images = slicedArray
    console.log('slicedArray:', images);

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
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, nextSlide]);


    //Auto slider closing x sigh
    function autoSliderX() {
        Navigate("/")
    }
    //click share icon for copy
    async function clickForCopy() {
        try {
            //  Clipboard API to copy text
            await navigator.clipboard.writeText(window.location.href);
            toast.success('copied!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        } catch (error) {
            console.error('Unable to copy URL:', error);
        }
    }

    //click heart icon for like
    // function clickHeart() {

    // }

    return (
        <>
            <Navbar className="navbar--in--AUtoSlider" />
            <ToastContainer />

            <div className="div--black--shadow">

                <div className="The--main--container">
                    <div className="slider-container">

                        <p className='X--for--close--autoSlider' onClick={autoSliderX}>X</p>
                        <i class="fa-solid fa-paper-plane" onClick={clickForCopy}></i>

                        <div className="slider" style={{
                            transform: `translateX(-${currentIndex * 100}%)`, transition: `transform 0.5s ease-in-out`
                        }}>
                            {images.map((obj, index) => (
                                <>
                                    <div key={index} className="slide" style={{ width: '100%' }}>
                                        <img src={obj.Add_Image_URL} alt="categoryimage" style={{ width: '100%' }} />
                                    </div>

                                </>
                            ))}
                        </div>

                        <div className="progress-container">
                            {images.map((obj, index) => (
                                <div key={index} className={`progress-bar ${index === currentIndex ? 'active' : ''}`} style={{ width: progressWidths[index] }}>
                                </div>
                            ))}
                        </div>

                        <div className="controls">
                            <button onClick={prevSlide}><i class="fa-solid fa-chevron-left"></i></button>
                            <button onClick={nextSlide}><i class="fa-solid fa-chevron-right"></i></button>
                        </div>

                        <i class="fa-solid fa-bookmark" id="AutoSlider--bookmark" ></i>
                        <i class="fa-solid fa-heart " ></i>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AutoSlider;
